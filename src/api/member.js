import api from './auth'

export async function getMembers(params) {
  const res = await api.get('/api/members', { params })
  return res.data
}

export async function createMember(payload) {
  const res = await api.post('/api/members', payload)
  return res.data
}

export default { getMembers, createMember }
