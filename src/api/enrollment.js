import request from './request'

export function getEnrollments() {
  return request.get('/api/enrollments')
}

export function createEnrollment(data) {
  return request.post('/api/enrollments', data)
}

export function getEnrollmentById(id) {
  return request.get(`/api/enrollments/${id}`)
}