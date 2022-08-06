import { request } from './request'

// 获取商品详情数据
export function getDetailData (id) {
  return request({
    method: 'GET',
    url: '/api/goods/' + id
  })
}
