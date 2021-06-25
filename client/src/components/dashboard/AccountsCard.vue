<template>
	<v-card>
		<v-card-title>Saldo das contas</v-card-title>
		<v-card-text v-if="accounts.length > 0 && !loading">
			<v-list>
				<v-list-item v-for="account in accounts" :key="account.id">
					<v-list-item-content>
						<v-list-item-title>{{account.name}}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<span class="success--text">R$ {{ account.balance | formatCash }}</span>
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-card-text>
		<v-card-text v-else-if="!loading">
			Registre suas contas para acompanhar seu saldo
		</v-card-text>
		<v-card-text v-else>
			<v-skeleton-loader type="list@2" />
		</v-card-text>
		<v-divider />
		<v-card-actions v-if="accounts.length > 0 && !loading">
			<v-spacer />
			<v-btn text to="/contas">
				<span class="text-capitalize">Contas</span>
			</v-btn>
		</v-card-actions>
		<v-card-actions v-else-if="!loading">
			<v-spacer />
			<v-btn text to="/contas/criar">
				<span class="text-capitalize">Cadastrar Conta</span>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import accounts from '@/store/modules/accounts';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AccountsCard extends Vue {
	loading = false
	get accounts() {
		if (!accounts.accounts.length && !this.loading) {
			this.loadData()
		}
		console.debug(accounts)
		return accounts.accounts
	}

	async loadData() {
		this.loading = true
		await accounts.fetchAccounts()
		for (const account of this.accounts) {
			await accounts.getAccountBalance(account.id)
		}
		this.loading = false
	}
}
</script>
