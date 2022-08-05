import { createStore } from 'vuex'

export default createStore({
  state: {
    currentPath: ''
  },
  getters: {
    currentPath: (state) => {
      return state.currentPath
    }
  },
  mutations: {
    SET_CURRENT_PATH: (state, value) => {
      state.currentPath = value
    }
  },
  actions: {
  },
  modules: {
  }
})
