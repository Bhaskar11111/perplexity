require('dotenv').config()

const nodemailer=require('nodemailer')

const getNumberEnv = (name, fallback) => {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

const requireEnv = (names) => {
  const missing = names.filter((name) => !process.env[name])

  if (missing.length) {
    throw new Error(`Missing email environment variables: ${missing.join(', ')}`)
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

try {
  transporter = nodemailer.createTransport(buildTransportConfig())
} catch (err) {
  console.error('[mail] Invalid email configuration:', err.message)
}

if (transporter) {
  transporter.verify()
.then(()=>
{
    console.log('Transporter is ready to send verification emails')
})
.catch((err)=>
{
    console.error('[mail] Transporter verification failed:', {
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      message: err.message
    })
})
}


const sendEmail=(async({to,from,subject,text,html})=>
{   
    if (!transporter) {
        throw new Error('Email transporter is not configured')
    }

    const sender = from || process.env.MAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER || process.env.GOOGLE_USER

    if (!sender) {
        throw new Error('Missing sender email. Set MAIL_FROM, SMTP_FROM, SMTP_USER, or GOOGLE_USER')
    }

    const mailOptions={
        from:sender,
        to,
        subject,
        text,
        html
    }
    try{
        const details=await transporter.sendMail(mailOptions)

    console.log("Email sent", {
        accepted: details.accepted,
        rejected: details.rejected,
        response: details.response
    })
    return details
}
catch(err){
    console.error('[mail] Send failed:', {
        code: err.code,
        command: err.command,
        responseCode: err.responseCode,
        message: err.message
    })
    throw err
}
})

module.exports=sendEmail
