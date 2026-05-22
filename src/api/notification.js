import request from './request'

export function getNotifications() {
  return request.get('/api/notifications')
}

export function getNotificationsByStudent(studentId) {
  return request.get(`/api/notifications/student/${studentId}`)
}

export function getNotificationsByEvent(eventId) {
  return request.get(`/api/notifications/event/${eventId}`)
}