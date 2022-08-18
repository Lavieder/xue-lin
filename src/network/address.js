import { request } from './request'

// 获取地址列表
export function getAddressData () {
  return request({
    method: 'GET',
    url: '/api/address'
  })
}

// 添加地址
export function addAddress (data) {
  return request({
    method: 'POST',
    url: '/api/address',
    data
  })
}

// 删除地址
export function removeAddress (addressId) {
  return request({
    method: 'DELETE',
    url: `/api/address/${addressId}`
  })
}

// 更新地址
export function updateAddress (addressId, data) {
  return request({
    method: 'PUT',
    url: `/api/address/${addressId}`,
    data
  })
}

// 设置为默认地址
export function defaultAddress (addressId) {
  return request({
    method: 'PATCH',
    url: `/api/address/${addressId}/default`
  })
}
