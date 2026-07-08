import api from './auth'

export async function getVirtualAccounts(params) {
  const res = await api.get('/api/virtual-accounts', { params })
  return res.data
}

export default { getVirtualAccounts }
