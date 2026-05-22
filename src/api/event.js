import request from './request'

export function getEventsByStudent(studentId) {
  return request.get(`/api/events/student/${studentId}`)
}

export function getEventsByTask(taskId) {
  return request.get(`/api/events/task/${taskId}`)
}