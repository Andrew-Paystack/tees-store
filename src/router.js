import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Layout.vue')
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: () => import('./components/Layout.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/Signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue')
    }
  ]
})
