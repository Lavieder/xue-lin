import { request } from './request'

// 获取分类数据
export function getCateData (categoryId) {
  let data = ''
  if (categoryId) data = '?category_id=' + categoryId
  return request({
    method: 'GET',
    url: '/api/goods' + data
  })
}
