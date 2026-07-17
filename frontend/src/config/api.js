const trimTrailingSlash = (url) => url.replace(/\/+$/, '');

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const defaultApiBaseUrl = isLocalhost
  ? 'http://localhost:3000'
  : 'https://etos-backend-wmmj.onrender.com';

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl
);
