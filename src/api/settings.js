import api from './auth'

export async function getSettings() {
  const res = await api.get('/api/settings')
  return res.data
}

export async function updateSettings(payload) {
  const res = await api.put('/api/settings', payload)
  return res.data
}

export default { getSettings, updateSettings }
