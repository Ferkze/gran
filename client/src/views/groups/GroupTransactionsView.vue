<template>
  <v-container>
		<v-row no-gutters align="center">
			<v-col>
				<v-card-title>
					<h2 class="title font-weight-medium">Transações do grupo</h2>
				</v-card-title>
			</v-col>
			<v-col class="text-right px-4">
				<v-btn class="primary px-6" depressed small @click="dialog = true">
					<span class="text-lowercase">criar transação</span>
				</v-btn>
			</v-col>
		</v-row>
    <transaction-filter-bar :data.sync="filter" @filter="filterTransaction" />
    <transactions-list v-if="transactions.length > 0" :loading="loading" :transactions="transactions" />
    <v-row v-else>
      <v-col cols="12">
				<v-card-text class="text-center">
					<p>Nenhuma transação associada ao grupo</p>
					<p>Começe adicionando novos registros clicando no botão acima</p>
				</v-card-text>
      </v-col>
    </v-row>
		<group-transaction-dialog :dialog.sync="dialog" :group-id="$route.params.groupId" />
  </v-container>
</template>

<script lang="ts">
import { Transaction, TransactionFilter } from "@/models";
import groupsModule from '@/store/modules/groupsModule';
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    GroupTransactionDialog: () => import('@/components/group/GroupTransactionDialog.vue'),
    TransactionFilterBar: () => import('@/components/transaction/TransactionFilterBar.vue'),
    TransactionsList: () => import("@/components/transaction/TransactionsList.vue"),
  },
})
export default class GroupTransactionsView extends Vue {
  get transactions(): Transaction[] {
    return groupsModule.selectedGroupTransactions;
  }
  dialog = false
  loading = false
  
  filter: TransactionFilter = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
  }

  mounted() {
    this.filter.group = this.$route.params.groupId
    this.filterTransaction()
  }

  async filterTransaction() {
    this.loading = true
    console.log(this.filter)
    await groupsModule.getSelectGroupTransactions(this.filter)
    this.loading = false
  }
}
</script>

<style scoped>
</style>