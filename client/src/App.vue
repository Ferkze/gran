<template>
	<v-app>
		<app-bar />
		<app-snackbar />

		<v-main v-if="!loading" class="grey lighten-3">
			<v-slide-x-reverse-transition mode="out-in">
				<router-view />
			</v-slide-x-reverse-transition>
		</v-main>
		<v-overlay v-else>
			<v-progress-circular indeterminate size="64" />
		</v-overlay>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import accounts from './store/modules/accounts'
import auth from './store/modules/auth'
import finances from './store/modules/finances'

@Component({
	components: {
		AppBar: () => import('@/components/AppBar.vue'),
		AppSnackbar: () => import('@/components/AppSnackbar.vue'),
	}
})
export default class App extends Vue {
	loading = false

	async mounted() {
		this.loading = true
		const user = auth.silentLogin()
		await finances.load()
		if (await user != null) {
			await accounts.fetchAccounts()
		}
		this.loading = false
	}
}
</script>
