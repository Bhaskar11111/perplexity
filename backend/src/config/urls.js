const normalizeUrl = (url) => (url || '').trim().replace(/\/+$/, '');

const DEFAULT_FRONTEND_URL = 'http://localhost:5173';
const DEFAULT_BACKEND_URL = 'http://localhost:3000';
const PRODUCTION_FRONTEND_URL = 'https://hello-etos.onrender.com';
const PRODUCTION_BACKEND_URL = 'https://etos-backend-wmmj.onrender.com';
const isProduction = process.env.NODE_ENV === 'production';

const frontendUrl = normalizeUrl(process.env.FRONTEND_URL) || (isProduction ? PRODUCTION_FRONTEND_URL : DEFAULT_FRONTEND_URL);
const backendUrl = normalizeUrl(process.env.BACKEND_URL || process.env.RENDER_EXTERNAL_URL) || (isProduction ? PRODUCTION_BACKEND_URL : DEFAULT_BACKEND_URL);

const parseOrigins = (value) => (value || '')
    .split(',')
    .map(normalizeUrl)
    .filter(Boolean);

const allowedOrigins = Array.from(new Set([
    frontendUrl,
    DEFAULT_FRONTEND_URL,
    'http://localhost:5174',
    PRODUCTION_FRONTEND_URL,
    ...parseOrigins(process.env.CORS_ORIGINS)
]));

module.exports = {
    frontendUrl,
    backendUrl,
    allowedOrigins
};
