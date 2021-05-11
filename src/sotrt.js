import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add (state, step) {
      state.count += step
    },
    subtraction (state, step) {
      state.count -= step
    }
  },
  actions: {
    addAc (a, aa) {
      setTimeout(() => {
        a.commit('add', aa)
      }, 1000)
    }

  },
  modules: {

  },
  getters: {
    ahow (ab) {
      return '里大太阳' + ab.count + '卢卡斯觉得'
    }
  }
})
