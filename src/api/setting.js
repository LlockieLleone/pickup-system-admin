import request from './request'

export function getSettings() {
  return request.get('/api/settings')
}

export function getSettingByKey(key) {
  return request.get(`/api/settings/${key}`)
}

export function createSetting(data) {
  return request.post('/api/settings', data)
}

export function updateSetting(key, data) {
  return request.put(`/api/settings/${key}`, data)
}