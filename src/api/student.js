import request from './request'

export function getStudents() {
  return request.get('/api/students')
}

export function createStudent(data) {
  return request.post('/api/students', data)
}

export function getStudentById(id) {
  return request.get(`/api/students/${id}`)
}

export function bindGuardianToStudent(studentId, guardianId) {
  return request.post(`/api/students/${studentId}/guardians/${guardianId}`)
}