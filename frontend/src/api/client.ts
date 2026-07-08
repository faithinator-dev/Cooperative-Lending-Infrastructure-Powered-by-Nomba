import axios from 'axios';

export const api = axios.create({
  baseURL: '', // use Vite proxy for /api
  timeout: 15000,
});

