import state from './state'

const getters = {
  isLogin: (state) => {
    return state.isLogin
  },
  cartTotal: () => {
    return state.cartTotal
  },
  backStatu: () => {
    return state.backStatu
  }
}
export default getters
