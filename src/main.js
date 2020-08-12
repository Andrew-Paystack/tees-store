import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

const instance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/pstk-itc-mobile-money.herokuapp.com/',
  // withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

Vue.prototype.$http = instance

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
