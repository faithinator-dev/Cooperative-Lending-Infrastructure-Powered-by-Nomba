import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
})

export async function login(payload) {
  const res = await api.post('/api/auth/login', payload)
  return res.data
}

export default api
