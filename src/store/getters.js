import state from './state'

const getters = {
  isLogin: (state) => {
    return state.isLogin
  },
  userInfo: (state) => {
    console.log('get', state.userInfo)
    return state.userInfo
  },
  cartTotal: () => {
    return state.cartTotal
  },
  backStatu: () => {
    return state.backStatu
  }
}
export default getters
