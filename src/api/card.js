import request from './request'

export function getCards() {
  return request.get('/api/cards')
}

export function createCard(data) {
  return request.post('/api/cards', data)
}

export function bindCardToStudent(studentId, cardId) {
  return request.post(`/api/students/${studentId}/cards/${cardId}`)
}