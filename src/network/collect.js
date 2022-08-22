import { request } from './request'

// 收藏
export function collectsGoods (id) {
  return request({
    method: 'POST',
    url: `/api/collects/goods/${id}`
  })
}

// 收藏列表
export function getCollectsData () {
  return request({
    method: 'GET',
    url: '/api/collects',
    data: {
      page: 1
    }
  })
}
