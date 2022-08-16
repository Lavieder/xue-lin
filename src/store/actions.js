import { getCartGoods } from '@/network/cart'

const actions = {
  getCartDataTotal: async ({ commit }) => {
    const res = await getCartGoods()
    if (res.status === 200) {
      let cartTotal = 0
      const data = res.data.data
      data.forEach(item => {
        cartTotal += item.num
      })
      commit('SET_CART_TOTAL', cartTotal || 0)
    }
  }
}
export default actions
