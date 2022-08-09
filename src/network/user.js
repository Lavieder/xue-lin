import { request } from './request'

export function registerRequest (data) {
  return request({
    method: 'POST',
    url: '/api/auth/register',
    data
  })
}
export function loginRequest (data) {
  return request({
    method: 'POST',
    url: '/api/auth/login',
    data
  })
}
export function logoutRequest () {
  return request({
    method: 'POST',
    url: '/api/auth/logout'
  })
}
