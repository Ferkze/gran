<template>
	<v-app>
		<app-bar />
		<app-snackbar />
		<side-bar />

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
import { Component, Vue } from "vue-property-decorator";
import auth from './store/modules/auth'
import finances from './store/modules/finances'
import status from "./store/modules/status";

@Component({
	components: {
		AppBar: () => import('@/components/AppBar.vue'),
		AppSnackbar: () => import('@/components/AppSnackbar.vue'),
		SideBar: () => import('@/components/SideBar.vue')
	},
	name: 'App'
})
export default class App extends Vue {
	loading = false

	async mounted() {
		this.loading = true
		try {
			await auth.silentLogin()
		} catch (error) {
			status.setStatus({
				type: 'error',
				message: 'Sessão expirada'
			})
			auth.logout()
		} finally {
			this.loading = false
		}
		await finances.load()
	}
}
</script>
