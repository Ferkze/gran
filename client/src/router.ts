import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
	{
		name: 'Home',
		path: '/',
		component: Home
	},
	{
		name: 'Login',
		path: '/entrar',
		component: Login
	},
	{
		name: 'Cadastro',
		path: '/cadastrar',
		component: Register
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Overview.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		name: 'Transações',
		path: '/transacoes',
		component: () => import(/* webpackChunkName: "transactions" */ './views/transactions/TransactionsView.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		name: 'Criar Transação',
		path: '/transacoes/criar',
		component: () => import(/* webpackChunkName: "dashboard" */ './views/transactions/CreateTransaction.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Editar Transação',
		path: '/transacoes/:transactionId/edicao',
		component: () => import(/* webpackChunkName: "dashboard" */ './views/transactions/EditTransaction.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Contas',
		path: '/contas',
		component: () => import(/* webpackChunkName: "accounts" */ './views/accounts/AccountsView.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Criar Conta',
		path: '/contas/criar',
		component: () => import(/* webpackChunkName: "accounts" */ './views/accounts/CreateDebitAccount.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Editar Conta',
		path: '/contas/:accountId',
		component: () => import(/* webpackChunkName: "accounts" */ './views/accounts/EditDebitAccount.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Projeções',
		path: '/projecoes',
		component: () => import(/* webpackChunkName: "projections" */ './views/projections/ProjectionsView.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		name: 'Estratégia',
		path: '/projecoes/estrategia',
		component: () => import(/* webpackChunkName: "projections" */ './views/projections/budgets/StrategyView.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		name: 'Criar novo orçamento',
		path: '/projecoes/orcamentos/criar',
		component: () => import(/* webpackChunkName: "projections" */ './views/projections/budgets/CreateBudgetView.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		name: 'Grupos',
		path: '/grupos',
		component: () => import(/* webpackChunkName: "groups" */ './views/groups/GroupsView.vue'),
		meta: {
			requiresAuth: true,
		}
	},
	{
		name: 'Admin',
		path: '/admin',
		component: () => import(/* webpackChunkName: "admin" */ './views/admin/Admin.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Admin-users',
		path: '/admin/usuarios',
		component: () => import(/* webpackChunkName: "admin" */ './views/admin/Users.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'Configurações',
		path: '/configuracoes',
		component: () => import(/* webpackChunkName: "profile" */ './views/profile/Settings.vue'),
		meta: {
			requiresAuth: true
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
