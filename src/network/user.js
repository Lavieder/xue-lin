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
// 属性Token
export function refreshToken () {
  return request({
    method: 'POST',
    url: '/api/auth/refresh'
  })
}

// 获取个人信息
export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 获取阿里云直传文件Token
export function getOssToken () {
  return request({
    method: 'GET',
    url: '/api/auth/oss/token'
  })
}
// 修改头像
export function uploaderAvatar (data) {
  return request({
    method: 'POST',
    url: '/api/user/avatar',
    data
  })
}

// 修改昵称
export function changeName (data) {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
