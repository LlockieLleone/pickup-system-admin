import request from './request'

export function getGuardians() {
  return request.get('/api/guardians')
}

export function createGuardian(data) {
  return request.post('/api/guardians', data)
}

export function getGuardianById(id) {
  return request.get(`/api/guardians/${id}`)
}