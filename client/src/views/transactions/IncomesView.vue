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
                  <v-avatar color="success">
                    <v-icon color="white">mdi-cash-check</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Recebido</v-list-item-subtitle>
                  <v-list-item-title>R$ {{receitasRecebidos | formatCurrency}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="success">
                    <v-icon color="white">mdi-cash-lock</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>A receber</v-list-item-subtitle>
                  <v-list-item-title>R$ {{receitasAReceber | formatCurrency}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="success">
                    <v-icon color="white">mdi-cash</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Total</v-list-item-subtitle>
                  <v-list-item-title>R$ {{receitasTotais | formatCurrency}}</v-list-item-title>
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
import { TransactionType } from "@/models/enums";
import auth from '@/store/modules/auth';
import finances from "@/store/modules/finances";
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		TransactionsList: () => import("@/components/transaction/TransactionsList.vue"),
		TransactionFilterBar: () => import('@/components/transaction/TransactionFilterBar.vue')
	},
})
export default class IncomesView extends Vue {
	get transactions() {
		return finances.transactions.filter((t) => t.type == TransactionType.DEBIT);
	}
	get receitasRecebidos () {
		var receitas = this.transactions.filter(t => t.type == TransactionType.DEBIT)
		return receitas.reduce((acc, cur) => acc + cur.amount, 0);
	}

	get receitasAReceber () {
		var receitas = this.transactions.filter(t => t.type == TransactionType.DEBIT)
		return receitas.reduce((acc, cur) => acc + cur.amount, 0);
	}

	get receitasTotais () {
		var receitas = this.transactions.filter(t => t.type == TransactionType.DEBIT)
		return receitas.reduce((acc, cur) => acc + cur.amount, 0)
	}


  loading = false
  filter = { 
  	year: new Date().getFullYear(),
  	month: new Date().getMonth()+1,
  	user: auth.userId
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
