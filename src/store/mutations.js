const mutations = {
  SET_IS_LOGIN: (state, value) => {
    state.isLogin = value
  },
  SET_USER_INFO: (state, value) => {
    state.userInfo = value
  },
  SET_CART_TOTAL: (state, value) => {
    state.cartTotal = value
  },
  SET_BACK_STATU: (state, value) => {
    state.backStatu = value
  },
  SET_CONTACT_ADDRESS: (state, value) => {
    if (value === {}) {
      state.contactAddress.aid = 0
    } else {
      state.contactAddress.aid = value.id
    }
    state.contactAddress.data = value
  }
}
export default mutations
