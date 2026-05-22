import request from './request'

export function getDashboardSummary(date) {
  return request.get('/api/tasks/summary', {
    params: {
      date
    }
  })
}