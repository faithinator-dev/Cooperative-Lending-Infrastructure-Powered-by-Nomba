import axios from 'axios';

// Set VITE_API_URL to the backend origin, without a trailing /api.
// Example: https://co-op-lend-api.vercel.app
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});
