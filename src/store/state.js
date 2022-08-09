const state = {
  // 当前路径
  currentPath: '',
  // 用户状态
  isLogin: false || !!window.localStorage.getItem('xltoken')
}
export default state
