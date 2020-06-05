<template>
	<v-app>
		<app-bar />
		<app-snackbar />
		<web-rail />

		<v-content v-if="!loading">
			<v-slide-x-reverse-transition mode="out-in">
				<router-view />
			</v-slide-x-reverse-transition>
		</v-content>
		<v-overlay v-else>
			<v-progress-circular indeterminate size="64" />
		</v-overlay>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from '@/components/AppBar.vue'
import Component from 'vue-class-component'
import { _currentUser } from './service/api/auth'
import auth from './store/modules/auth'
import finances from './store/modules/finances'

@Component({
	components: {
		AppBar,
		AppSnackbar: () => import('@/components/AppSnackbar.vue'),
		WebRail: () => import('@/components/WebRail.vue')
	},
	name: 'App'
})
export default class App extends Vue {
	loading = false

	async mounted() {
		this.loading = true
		auth.setUser(_currentUser())

		await Promise.all([
			finances.fetchCategories(),
			finances.fetchInstitutions(),
			finances.fetchAccounts(),
			finances.fetchTransactions()
		])
		this.loading = false
	}
}
</script>
