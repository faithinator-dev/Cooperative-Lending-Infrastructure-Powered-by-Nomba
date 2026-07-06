import api from './auth'

export async function getLoans(params) {
  const res = await api.get('/api/loans', { params })
  return res.data
}

export async function createLoan(payload) {
  const res = await api.post('/api/loans', payload)
  return res.data
}

export default { getLoans, createLoan }
