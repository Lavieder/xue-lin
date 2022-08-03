import { request } from './request'

// 获取首页轮播图和猜你喜欢的数据
export function getHomeAllData () {
  return request({
    url: '/api/index'
  })
}
// 获取tab标签页的数据
export function getTabData (type, page) {
  return request({
    method: 'GET',
    url: '/api/index?' + type + '=1&page=' + page
  })
}
