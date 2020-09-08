<template>
	<v-navigation-drawer permanent app clipped :mini-variant="mini" mini-variant-width="80">
		<v-row class="fill-height" no-gutters>
			<!-- <v-col>
				<v-list two-line>
					<v-list-item>
						<v-list-item-action>
							<v-btn fab color="primary">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-col> -->
			<v-col>
				<v-list nav>
					<v-list-item
						v-for="item in items"
						:key="item.name"
						:to="item.route"
						:class="mini && 'px-0'"
						active-class="primary--text"
						exact
						link
					>
						<v-list-item-action class="text-center">
							<v-icon v-html="item.icon" />
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ item.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item @click="mini = !mini">
						<v-list-item-icon>
							<v-icon v-html="mini ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
						</v-list-item-icon>
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
	mini = true

	items = [
		{ name: 'Visão Geral', route: '/dashboard/', icon: 'mdi-view-dashboard' },
		{ name: 'Transações', route: '/dashboard/transactions', icon: 'mdi-cash-multiple' },
		{ name: 'Contas', route: '/dashboard/contas', icon: 'mdi-currency-usd' },
		{ name: 'Orçamentos', route: '/dashboard/budgets', icon: 'mdi-poll' },
		{ name: 'Grupos', route: '/dashboard/groups', icon: 'mdi-account-group' }
	]

	get user() {
		return auth.user
	}
}
</script>
