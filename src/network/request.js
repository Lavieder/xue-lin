import axios from 'axios'

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
    console.log(err)
  })

  // 响应拦截
  axios.interceptors.response.use(res => {
    return res
  }, err => {
    console.log(err)
  })

  return instance(config)
}
