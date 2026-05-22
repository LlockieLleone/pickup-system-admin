import request from './request'

export function getAttendanceExceptions() {
  return request.get('/api/attendance-exceptions')
}

export function createAttendanceException(data) {
  return request.post('/api/attendance-exceptions', data)
}

export function getAttendanceExceptionById(id) {
  return request.get(`/api/attendance-exceptions/${id}`)
}