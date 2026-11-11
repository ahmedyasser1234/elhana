import axios from 'axios';

// When in browser, default to relative '/api' if not explicitly configured,
// so requests work properly on any host (Vercel, custom domain) without failing on localhost.
const getBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    if (window.location.port === '5173') return 'http://localhost:3000/api';
    return '/api';
  }
  return 'http://localhost:3000/api';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 15000
});

apiClient.interceptors.request.use(config => {
  const token = sessionStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;

