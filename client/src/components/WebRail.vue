<template>
	<v-navigation-drawer permanent app clipped :mini-variant="mini" mini-variant-width="80">
		<v-row class="fill-height" no-gutters align="center">
			<v-col>
				<v-list two-line>
					<v-list-item>
						<v-list-item-action>
							<v-btn fab color="primary">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col>
				<v-list two-line>
					<v-list-item v-for="item in items" :key="item.name" :to="item.route" exact active-class="primary--text">
						<template v-slot:default="{}">
							<v-list-item-action class="text-center">
								<v-icon v-html="item.icon" />
							</v-list-item-action>
							<v-list-item-content>
								{{ item.name }}
							</v-list-item-content>
						</template>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col>
				<v-list>
					<v-list-item :exact="false" @click="mini = !mini">
						<v-list-item-icon>
							<v-icon v-html="mini ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
						</v-list-item-icon>
						<v-list-item-content v-if="user">
							<v-list-item-title>{{ user.username }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../store/modules/auth'

@Component
export default class WebRail extends Vue {
	items = [
		{ name: 'Visão Geral', route: '/dashboard/', icon: 'mdi-view-dashboard' },
		{ name: 'Transações', route: '/dashboard/transactions', icon: 'mdi-cash-multiple' },
		{ name: 'Contas', route: '/dashboard/contas', icon: 'mdi-currency-usd' },
		// { name: 'Gastos', route: '/dashboard/bills', icon: 'mdi-currency-usd-off' },
		{ name: 'Orçamentos', route: '/dashboard/budgets', icon: 'mdi-poll' },
		{ name: 'Investimentos', route: '/dashboard/investments', icon: 'mdi-elevation-rise' },
		{ name: 'Grupos', route: '/dashboard/groups', icon: 'mdi-account-group' }
	]

	get user() {
		return auth.user
	}

	mini = true
}
</script>
