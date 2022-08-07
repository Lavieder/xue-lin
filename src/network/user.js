import { request } from './request'

export function registerRequest (data) {
  return request({
    method: 'POST',
    url: '/api/auth/register',
    data: data
  })
}
