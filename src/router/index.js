import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/layout'
import Home from '@/views/home'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [ // 子路由
      {
        path: '',
        name: 'home',
        component: Home
      }
    ]

  }
]
const router = new VueRouter({
  routes
})

export default router
