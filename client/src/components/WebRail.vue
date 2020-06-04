<template>
	<v-navigation-drawer permanent>
		<v-list>
			<v-list-item v-for="item in items" :key="item.name" :to="item.route" :exact="false">
				<v-list-item-icon>
					<v-icon color="" v-html="item.icon" />
				</v-list-item-icon>
				<v-list-item-content>
					{{ item.name }}
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class WebRail extends Vue {
	items = [
		{ name: 'Visão Geral', route: '/dashboard/', icon: 'mdi-view-dashboard' },
		{ name: 'Contas', route: '/dashboard/contas', icon: 'mdi-currency-usd' },
		{ name: 'Gastos', route: '/dashboard/bills', icon: 'mdi-currency-usd-off' },
		{ name: 'Orçamentos', route: '/dashboard/budgets', icon: 'mdi-poll' },
		{ name: 'Investimentos', route: '/dashboard/investments', icon: 'mdi-elevation-rise' },
		{ name: 'Transações', route: '/dashboard/transactions', icon: 'mdi-cash-multiple' }
	]
}
</script>
