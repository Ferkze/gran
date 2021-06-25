<template>
	<v-dialog v-model="show" width="780">
		<v-card>
			<v-card-title>Adicionar transação</v-card-title>
			<v-card-text>
				<transaction-form
					:data.sync="transaction"
					:loading="loading"
					@submit="createTransaction"
				/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Group, Transaction, User } from '@/models';
import { TransactionType } from '@/models/enums';
import GroupsService from '@/service/api/GroupsService';
import auth from '@/store/modules/auth';
import finances from '@/store/modules/finances';
import groupsModule from '@/store/modules/groupsModule';
import status from '@/store/modules/status';
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';

@Component({
	components: {
		TransactionForm: () => import('@/components/transaction/TransactionForm.vue'),
	}
})
export default class GroupTransactionDialog extends Vue {
		@PropSync('dialog', { type: Boolean, default: false })
		show!: boolean

		@Prop({ required: true, type: String })
		groupId!: Group['id']

		transaction: Transaction = {
			account: '',
			user: auth.user?.id || '',
			type: TransactionType.CREDIT,
			paid: true,
			amount: 0,
			description: '',
			category: '',
			group: this.groupId,
			date: new Date().toISOString().substr(0, 10),
		};
		loading = false

		async createTransaction() {
			this.loading = true;
			try {
				await finances.newTransaction(this.transaction);
				status.setStatus({
					type: "success",
					message: "Transação salva com sucesso",
				});
				this.show = false
			} catch (error) {
				status.setStatus({
					type: "error",
					message: `Não foi possível criar a transação: ${error.toString()}`,
				});
				status.setError(error);
			} finally {
				this.loading = true;
			}
		}
}
</script>

<style scoped>

</style>