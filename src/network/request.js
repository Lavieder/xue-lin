import axios from 'axios'
import { Toast } from 'vant'
import router from '../router/index'

export function request (config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn/',
    timeout: 8000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 接口认证
    const token = window.localStorage.getItem('xltoken')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // 直接方向
    return config
  }, err => {
    console.log(err.response.data)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    // 如果登录出错，需要授权
    if (err.response.stutas === 401) {
      Toast.fail('未授权用户,请重新登录/注册')
      setTimeout(() => {
        router.push({ path: '/login' })
      }, 1000)
    }
    if (err.response.status === 422) {
      const errors = err.response.data.errors
      const errorText = errors[Object.keys(errors)[0]]
      Toast.fail(errorText[0])
      return
    }

    return err.response
  })

  return instance(config)
}
