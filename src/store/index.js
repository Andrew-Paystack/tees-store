import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import magazine from './modules/magazine'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    magazine
  }
})
