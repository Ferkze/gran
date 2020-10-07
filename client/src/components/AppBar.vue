<template>
	<v-app-bar
		v-if="isAuthenticated"
		app
		color="white"
		clipped-left
		clipped-right
		flat
	>
		<base-gran-logo />
		<v-spacer />

		<v-toolbar-items class="mr-16">
			<v-btn text to="/contas" class="px-8" active-class="primary">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Contas
				</span>
			</v-btn>
			<v-btn text to="/transacoes" active-class="primary">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Transações
				</span>
			</v-btn>
			<v-btn text to="/dashboard" class="px-10" active-class="primary">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Início
				</span>
			</v-btn>
			<v-btn text to="/planejamento" active-class="primary">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Planejamento
				</span>
			</v-btn>
			<v-btn text to="/grupos" class="px-8" active-class="primary">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Grupos
				</span>
			</v-btn>
		</v-toolbar-items>
		<v-spacer />

		<v-toolbar-items v-show="isAuthenticated" class="ml-16">
			<v-btn icon class="mx-2" @click="$router.push('/configuracoes')">
				<v-avatar color="white" size="36">
					<v-icon color="primary">mdi-cog-outline</v-icon>
				</v-avatar>
			</v-btn>
			<v-btn icon class="mx-2" @click="$router.push('/configuracoes')">
				<v-avatar color="white" size="36">
					<v-icon color="primary">mdi-account-outline</v-icon>
				</v-avatar>
			</v-btn>
		</v-toolbar-items>
	</v-app-bar>
	<v-app-bar
		v-else
		app
		elevate-on-scroll
		flat
		scroll-threshold="400"
	>
		<base-gran-logo />
		<v-spacer />

		<v-spacer />
		<v-toolbar-items>
			<v-btn text @click="$router.push('/entrar')">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Entrar
				</span>
			</v-btn>
			<v-btn text @click="$router.push('/cadastrar')">
				<span class="subtitle-1 text-capitalize font-weight-light">
					Cadastrar
				</span>
			</v-btn>
		</v-toolbar-items>
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../store/modules/auth'

@Component({
	components: {
		BaseGranLogo: () => import('../components/base/GranLogo.vue')
	},
	inject: ['theme']
})
export default class AppBar extends Vue {
	get isAuthenticated() {
		return auth.isAuthenticated
	}
}
</script>
