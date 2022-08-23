import { request } from './request'

// 获取购物车商品列表
export function getCartGoods () {
  return request({
    method: 'GET',
    url: '/api/carts?include=goods'
  })
}

// 添加到购物车
export function addCartGoods (data) {
  return request({
    method: 'POST',
    url: '/api/carts',
    data
  })
}
// 修改购物车商品数量，参数：购物车ID，商品数量num
export function modifyCartNum (cartId, data) {
  return request({
    method: 'PUT',
    url: `/api/carts/${cartId}`,
    data
  })
}

// 改变购物车商品选中状态，参数：购物车ID
export function checkedCartGoods (data) {
  return request({
    method: 'PATCH',
    url: '/api/carts/checked',
    data
  })
}

// 移除购物车商品
export function deleteCartGoods (id) {
  return request({
    method: 'DELETE',
    url: `/api/carts/${id}`
  })
}
