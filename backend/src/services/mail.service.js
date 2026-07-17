require('dotenv').config()

const nodemailer = require('nodemailer')

const GMAIL_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GMAIL_SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send'

const getNumberEnv = (name, fallback) => {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

const hasGoogleOAuthConfig = () => Boolean(
  process.env.GOOGLE_USER &&
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_REFRESH_TOKEN
)

const requireEnv = (names) => {
  const missing = names.filter((name) => !process.env[name])

  if (missing.length) {
    throw new Error(`Missing email environment variables: ${missing.join(', ')}`)
  }
}

const getSender = (from) => from ||
  process.env.MAIL_FROM ||
  process.env.SMTP_FROM ||
  process.env.SMTP_USER ||
  process.env.GOOGLE_USER

const getDeliveryMode = () => {
  if (process.env.EMAIL_DELIVERY) {
    return process.env.EMAIL_DELIVERY
  }

  return hasGoogleOAuthConfig() ? 'gmail-api' : 'smtp'
}

const encodeBase64Url = (value) => Buffer
  .from(value, 'utf8')
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/g, '')

const encodeHeader = (value) => {
  if (/^[\x00-\x7F]*$/.test(value)) {
    return value
  }

  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`
}

const buildMimeMessage = ({ from, to, subject, text, html }) => {
  const boundary = `etos-${Date.now()}-${Math.random().toString(16).slice(2)}`
  const fallbackText = text || 'Please open this email in an HTML-capable email client.'

  return [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    fallbackText,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    html || fallbackText,
    '',
    `--${boundary}--`,
    ''
  ].join('\r\n')
}

const fetchWithTimeout = async (url, options, timeoutMs) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Gmail API request timed out')
    }

    throw err
  } finally {
    clearTimeout(timeout)
  }
}

const getGmailAccessToken = async () => {
  requireEnv(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'])

  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  })

  const response = await fetchWithTimeout(GMAIL_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }, getNumberEnv('EMAIL_HTTP_TIMEOUT_MS', 15000))

  const data = await response.json().catch(() => ({}))

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || `Gmail token request failed with ${response.status}`)
  }

  return data.access_token
}

const sendWithGmailApi = async ({ to, from, subject, text, html }) => {
  requireEnv(['GOOGLE_USER', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'])

  const sender = getSender(from)

  if (!sender) {
    throw new Error('Missing sender email. Set MAIL_FROM or GOOGLE_USER')
  }

  const accessToken = await getGmailAccessToken()
  const raw = encodeBase64Url(buildMimeMessage({
    from: sender,
    to,
    subject,
    text,
    html
  }))

  const response = await fetchWithTimeout(GMAIL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  }, getNumberEnv('EMAIL_HTTP_TIMEOUT_MS', 15000))

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const detail = data.error?.message || data.error_description || `Gmail send failed with ${response.status}`
    throw new Error(detail)
  }

  console.log('[mail] Gmail API email sent', {
    id: data.id,
    to
  })

  return {
    accepted: [to],
    rejected: [],
    response: data.id || 'Gmail API accepted message'
  }
}

const buildTransportConfig = () => {
  const baseConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: getNumberEnv('SMTP_PORT', process.env.SMTP_SECURE === 'true' ? 465 : 587),
    secure: process.env.SMTP_SECURE === 'true',
    connectionTimeout: getNumberEnv('SMTP_CONNECTION_TIMEOUT_MS', 15000),
    greetingTimeout: getNumberEnv('SMTP_GREETING_TIMEOUT_MS', 10000),
    socketTimeout: getNumberEnv('SMTP_SOCKET_TIMEOUT_MS', 20000),
  }

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return {
      ...baseConfig,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }
  }

  if (process.env.GOOGLE_APP_PASSWORD) {
    requireEnv(['GOOGLE_USER', 'GOOGLE_APP_PASSWORD'])

    return {
      ...baseConfig,
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    }
  }

  requireEnv(['GOOGLE_USER', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'])

  return {
    ...baseConfig,
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  }
}

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport(buildTransportConfig())
  }

  return transporter
}

const sendWithSmtp = async ({ to, from, subject, text, html }) => {
  const sender = getSender(from)

  if (!sender) {
    throw new Error('Missing sender email. Set MAIL_FROM, SMTP_FROM, SMTP_USER, or GOOGLE_USER')
  }

  const details = await getTransporter().sendMail({
    from: sender,
    to,
    subject,
    text,
    html
  })

  console.log('[mail] SMTP email sent', {
    accepted: details.accepted,
    rejected: details.rejected,
    response: details.response
  })

  return details
}

const sendEmail = async ({ to, from, subject, text, html }) => {
  try {
    if (getDeliveryMode() === 'gmail-api') {
      return await sendWithGmailApi({ to, from, subject, text, html })
    }

    return await sendWithSmtp({ to, from, subject, text, html })
  } catch (err) {
    console.error('[mail] Send failed:', {
      delivery: getDeliveryMode(),
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      message: err.message
    })
    throw err
  }
}

module.exports = sendEmail
