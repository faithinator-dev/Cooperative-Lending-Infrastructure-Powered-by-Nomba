import api from './auth'

export async function getTransactions(params) {
  const res = await api.get('/api/transactions', { params })
  return res.data
}

export default { getTransactions }
