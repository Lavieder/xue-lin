const state = {
  // 用户状态
  isLogin: false || !!window.localStorage.getItem('xltoken'),
  // 购物车总数量
  cartTotal: 0,
  // 返回状态
  backStatu: false
}
export default state
