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
        name: 'Contas – Visão Geral',
        path: 'contas',
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
        name: 'Transactions Dashboard',
        path: 'transactions',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Transactions.vue')
      },
      {
        name: 'Investments Dashboard',
        path: 'investments',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Investments.vue')
      }
    ]
  },
  {
    path: '/contas',
    name: 'Contas',
    component: () => import(/* webpackChunkName: "accounts" */ './views/dashboard/Accounts.vue')
  },
  {
    path: '/contas/criar',
    name: 'Criar Conta',
    component: () => import(/* webpackChunkName: "accounts" */ './views/accounts/CreateAccount.vue')
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
  },
  {
    name: 'Configurações',
    path: '/configuracoes',
    component: () => import(/* webpackChunkName: "profile" */ './views/profile/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
