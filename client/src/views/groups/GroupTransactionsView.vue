<template>
  <v-container>
		<v-row no-gutters align="center">
			<v-col>
				<v-card-title>
					<h2 class="title font-weight-medium">Transações do grupo</h2>
				</v-card-title>
			</v-col>
			<v-col class="text-right px-4">
				<v-btn class="primary px-6" depressed small :to="`/transacoes/criar?grupo=${$route.params.groupId}`">
					<span class="text-lowercase">criar transação</span>
				</v-btn>
			</v-col>
		</v-row>
    <v-row>
      <v-spacer />
      <v-col cols="4" class="text-center">
        <div class="text-center">
          <v-btn icon class="px-5" @click="prevMonth">
            <v-icon size="20">mdi-chevron-left</v-icon>
          </v-btn>
          <span class="font-weight-light text-body-1 grey--text text--darken-3">{{ month | monthName }} de {{ year }}</span>
          <v-btn icon class="px-5" @click="nextMonth">
            <v-icon size="20">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn text>
          <v-icon left>mdi-filter</v-icon>
          <span class="text-capitalize">Filtrar</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card-text v-if="transactions.length > 0">
					<v-list>
						<transaction-item v-for="item in transactions" :key="item.id" :transaction="item" />
					</v-list>
				</v-card-text>
				<v-card-text v-else class="text-center">
					<p>Nenhuma transação associada ao grupo</p>
					<p>Começe adicionando novos registros clicando no botão acima</p>
				</v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Transaction } from "@/models";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    TransactionItem: () =>
      import("@/components/transaction/TransactionListItem.vue"),
  },
})
export default class GroupTransactionsView extends Vue {
  year = 2020;
  month = 10;

  nextMonth() {
    if (this.month == 12) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
  }

  prevMonth() {
    if (this.month == 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }
  }

  get transactions(): Transaction[] {
    return [];
  }
}
</script>

<style scoped>
</style>