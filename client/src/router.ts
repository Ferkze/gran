import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/entrar',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'DashboardRoot',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '/',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Overview.vue')
      },
      {
        name: 'Accounts Dashboard',
        path: 'accounts',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Accounts.vue')
      },
      {
        name: 'Bills Dashboard',
        path: 'bills',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Bills.vue')
      },
      {
        name: 'Budgets Dashboard',
        path: 'budgets',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Budgets.vue')
      },
      {
        name: 'Investments Dashboard',
        path: 'investments',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Investments.vue')
      },
      {
        name: 'Settings Dashboard',
        path: 'settings',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Settings.vue')
      }
    ]
  },
  {
    path: '/transacoes',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Transactions.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ './views/admin/Admin.vue')
  },
  {
    path: '/admin/usuarios',
    name: 'Admin-users',
    component: () => import(/* webpackChunkName: "admin" */ './views/admin/Users.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
