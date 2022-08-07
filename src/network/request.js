import axios from 'axios'
import { Toast } from 'vant'

export function request (config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn/',
    timeout: 8000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 接口认证

    // 直接方向
    return config
  }, err => {
    console.log(err.response.data)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    const errors = err.response.data.errors
    const errorText = errors[Object.keys(errors)[0]]
    Toast.fail(errorText[0])
    // return Promise.reject(err)
  })

  return instance(config)
}
