import request from './request'

export function getTeachers() {
  return request.get('/api/teachers')
}

export function createTeacher(data) {
  return request.post('/api/teachers', data)
}

export function getTeacherById(id) {
  return request.get(`/api/teachers/${id}`)
}