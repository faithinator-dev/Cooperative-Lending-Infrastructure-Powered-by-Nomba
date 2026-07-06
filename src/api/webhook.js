import api from './auth'

export async function getWebhookLogs(params) {
  const res = await api.get('/api/webhooks', { params })
  return res.data
}

export default { getWebhookLogs }
