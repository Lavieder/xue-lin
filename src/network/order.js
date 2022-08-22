import { request } from './request'

// 订单预览,从购物车进入预览，在预览中提交订单
export function getOrderPreview () {
  return request({
    method: 'GET',
    url: '/api/orders/preview'
  })
}

// 提交订单
export function createOrder (addressId) {
  return request({
    method: 'POST',
    url: '/api/orders',
    data: {
      address_id: addressId
    }
  })
}

// 订单详情
export function getOrderDetail (orderId, data) {
  return request({
    method: 'GET',
    url: `/api/orders/${orderId}`,
    data: {
      include: 'user,orderDetails,goods'
    }
  })
}

// 订单支付,获得支付二维码
export function payOrder (orderId, data) {
  return request({
    method: 'GET',
    url: `/api/orders/${orderId}/pay`,
    data
  })
}
// 查询支付状态
export function getPayStatus (orderId) {
  return request({
    method: 'GET',
    url: `/api/orders/${orderId}/status`
  })
}

// 获取订单列表
export function getOrdersData (data) {
  return request({
    method: 'GET',
    url: '/api/orders',
    data
  })
}

// 获取物流详情
export function getOrderExpress (orderId) {
  return request({
    method: 'GET',
    url: `/api/orders/${orderId}/express`
  })
}

// 确认收货
export function comfirmReceipt (orderId) {
  return request({
    method: 'PATCH',
    url: `/api/orders/${orderId}/confirm`
  })
}

// 评价商品
export function commentGoods (orderId, data) {
  return request({
    method: 'POST',
    url: `/api/orders/${orderId}/comment`,
    data
  })
}
