<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
          <v-row no-gutters>
            <v-col cols="3">
              <v-list-item to="/transacoes/criar">
                <v-list-item-icon>
                  <v-avatar color="primary">
                    <v-icon color="white">mdi-plus</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Registrar</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="error">
                    <v-icon color="white">mdi-cart</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Pago</v-list-item-subtitle>
                  <v-list-item-title>R$ {{despesasPagas | formatCurrency}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="error">
                    <v-icon color="white">mdi-cart-arrow-right</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>A pagar</v-list-item-subtitle>
                  <v-list-item-title>R$ {{despesasAPagar | formatCurrency}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="error">
                    <v-icon color="white">mdi-cash</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Total</v-list-item-subtitle>
                  <v-list-item-title>R$ {{ depesasTotais | formatCurrency}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <transaction-filter-bar :data.sync="filter" @filter="filterTransaction" />
    <transactions-list :loading="loading" :transactions="transactions" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import finances from "@/store/modules/finances";
import { TransactionType } from '@/models/enums';
import auth from '@/store/modules/auth';

@Component({
	components: {
		TransactionsList: () => import("@/components/transaction/TransactionsList.vue"),
		TransactionFilterBar: () => import('@/components/transaction/TransactionFilterBar.vue')
	}
})
export default class ExpensesView extends Vue {
	get transactions() {
		return finances.transactions.filter(t => t.type == TransactionType.CREDIT);
	}
  loading = false
  filter = { 
  	year: new Date().getFullYear(),
  	month: new Date().getMonth()+1,
  	user: auth.userId
  }

  get despesasPagas () {
  	var despesas = this.transactions.filter(t => t.type == TransactionType.CREDIT && t.paid)
  	return despesas.reduce((acc, cur) => acc + cur.amount, 0);
  }

  get despesasAPagar () {
  	var despesas = this.transactions.filter(t => t.type == TransactionType.CREDIT && !t.paid)
  	return despesas.reduce((acc, cur) => acc + cur.amount, 0);
  }

  get depesasTotais () {
  	var saldo = (this.despesasPagas) + (this.despesasAPagar) 
  	return saldo
  }

  mounted() {
  	this.filterTransaction()
  }

  async filterTransaction() {
  	this.loading = true
  	await finances.filterTransactions(this.filter)
  	this.loading = false
  }
}
</script>
