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
                  <v-list-item-title>Registrar</v-list-item-title>
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
                  <v-list-item-title>Receitas</v-list-item-title>
                  <v-list-item-subtitle>{{receitasTotais}}</v-list-item-subtitle>
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
                  <v-list-item-title>Despesas</v-list-item-title>
                  <v-list-item-subtitle>R$ 723213</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="warning">
                    <v-icon color="white">mdi-scale-balance</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Saldo</v-list-item-title>
                  <v-list-item-subtitle>R$ 100000</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="4" class="text-center">
        <v-btn icon class="px-5" @click="prevMonth">
          <v-icon size="20">mdi-chevron-left</v-icon>
        </v-btn>
        <span class="font-weight-light text-body-1 grey--text text--darken-3">{{ month | monthName }} de {{ year }}</span>
        <v-btn icon class="px-5" @click="nextMonth">
          <v-icon size="20">mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn text>
          <v-icon left>mdi-filter</v-icon>
          <span class="text-capitalize">Filtro</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <app-transaction-item v-for="item in transactions" :key="item.id" :transaction="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import finances from "@/store/modules/finances";
import { filter } from "vue/types/umd";
import { TransactionType } from "../../models/enums";
import { Transaction } from "../../models";
import auth from "../../store/modules/auth";

@Component({
  components: {
    AppTransactionItem: () =>
      import("@/components/transaction/TransactionListItem.vue"),
  },
})
export default class TransactionsView extends Vue {
  get transactions():Transaction[]{
    return finances.transactions;
  }
	year = 2020
  month = 10

  get receitasTotais () {
    var receitas = this.transactions.filter(t => t.type == TransactionType.DEBIT)
    return receitas.reduce((acc, cur) => acc + cur.amount, 0);
  }

  filter = { 
    year : 2020,
    month : 10,
    user : auth.user.id,
  }

	nextMonth() {
		if (this.month == 12) {
			this.filter.month = 1
			this.filter.year++
		} else {
			this.filter.month++
    }
    this.filterTransaction()
	}

	prevMonth() {
		if (this.month == 1) {
			this.filter.month = 12
			this.filter.year--
		} else {
			this.filter.month--
    }
    this.filterTransaction()
  }
  
  filterTransaction() {
    finances.filterTransactions(this.filter)
  }

}
</script>
