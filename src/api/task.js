import request from './request'

export function getTasks(date) {
  return request.get('/api/tasks', {
    params: {
      date
    }
  })
}

export function generateTasks(date) {
  return request.post('/api/tasks/generate', null, {
    params: {
      date
    }
  })
}

export function getTaskById(id) {
  return request.get(`/api/tasks/${id}`)
}