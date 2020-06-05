<template>
	<div>
		<v-row no-gutters :class="`pa-4 transaction ${transaction.type}`">
			<v-col xs="12" md="6" lg="5">
				<div class="caption secondary--text">Descrição</div>
				<div>{{ transaction.description }}</div>
			</v-col>
			<v-col xs="6" sm="4" md="2">
				<div class="caption secondary--text">Valor</div>
				<div :class="`${typeColor}--text`">R$ {{ transaction.amount }}</div>
			</v-col>
			<v-col xs="6" sm="4" md="2">
				<div class="caption secondary--text">Conta</div>
				<div>{{ account.name }}</div>
			</v-col>
			<v-col xs="6" sm="4" md="2">
				<div class="caption secondary--text">Data</div>
				<div>{{ transaction.date.substr(0, 10) }}</div>
			</v-col>
			<v-col xs="2" sm="4" md="2" lg="1" class="text-right pr-3 mt-1">
				<div>
					<v-menu bottom left>
						<template v-slot:activator="{ on }">
							<v-btn icon color="primary" dark v-on="on">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item v-for="item in menuItems" :key="item.action" @click="onMenuItemSelected(item.action)">
								<v-list-item-title>{{ item.text }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</v-col>
		</v-row>
		<v-divider />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Transaction, Account } from '../models'
import { TransactionType } from '../models/enums'
import finances from '../store/modules/finances'
import status from '../store/modules/status'

@Component
export default class TransactionListItem extends Vue {
	@Prop({ type: Object, required: true }) transaction!: Transaction

	menuItems = [
		{ text: 'Editar', action: 'edit' },
		{ text: 'Deletar', action: 'delete' }
	]

	get account(): Account | undefined {
		let account: any
		switch (this.transaction.type) {
			case TransactionType.DEBIT: {
				account = this.transaction.debitAccount
			}
			case TransactionType.CREDIT: {
				account = this.transaction.creditAccount
			}
			case TransactionType.TRANSFERENCE: {
				if (!this.transaction.creditAccount) {
					account = this.transaction.debitAccount
				} else {
					account = this.transaction.creditAccount
				}
			}
		}
		if (typeof account == 'string') {
			return finances.accounts.find(a => a._id == account)
		}
		return account
	}
	get typeColor(): string {
		switch (this.transaction.type) {
			case TransactionType.DEBIT: {
				return 'green'
			}
			case TransactionType.CREDIT: {
				return 'red'
			}
			case TransactionType.TRANSFERENCE: {
				return 'blue'
			}
			default: {
				return 'grey'
			}
		}
	}

	async onMenuItemSelected(action: string) {
		switch (action) {
			case 'edit':
				this.$router.push(`/transacao/${this.transaction._id}/edicao`)
				break
			case 'delete':
				try {
					finances.deleteTransaction(this.transaction)
					status.setStatus({
						type: 'success',
						message: 'Transação excluída com sucesso'
					})
				} catch (error) {}
				break
			default:
				break
		}
	}
}
</script>

<style>
.transaction.debit {
	border-left: 4px solid green;
}
.transaction.credit {
	border-left: 4px solid red;
}
.transaction.transference {
	border-left: 4px solid royalblue;
}
</style>
