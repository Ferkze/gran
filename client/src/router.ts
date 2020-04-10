import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/entrar',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
  },
  {
    path: '/transacoes',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Transactions.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ './views/admin/Admin.vue'),
  },
  {
    path: '/admin/usuarios',
    name: 'Admin-users',
    component: () => import(/* webpackChunkName: "admin" */ './views/admin/Users.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
