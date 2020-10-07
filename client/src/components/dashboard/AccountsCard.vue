<template>
	<v-card>
		<v-card-title>Saldo das contas</v-card-title>
		<v-card-text>
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
		<v-divider></v-divider>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text>
				<span class="text-capitalize">Contas</span>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component
	export default class AccountsCard extends Vue {
		accounts = [
			{ id: 0, name: 'Nubank', balance: 300 },
			{ id: 1, name: 'Carteira', balance: 100 },
			{ id: 2, name: 'Itaú', balance: 50 },
		]
	}
</script>

<style scoped>

</style>