const state = {
  // 用户状态
  isLogin: false || !!window.localStorage.getItem('xltoken'),
  // 用户信息
  userInfo: JSON.parse(window.localStorage.getItem('xluser')),
  // 购物车总数量
  cartTotal: 0,
  // 返回状态
  backStatu: false,
  // 订单选择地址
  contactAddress: {
    aid: 0,
    data: {},
    way: ''
  }
}
export default state
