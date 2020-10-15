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
    <transactions-filter-bar :data.sync="filter" @filter="filterTransaction" />
    <v-row v-if="!loading">
      <v-col cols="12">
        <app-transaction-item v-for="item in transactions" :key="item.id" :transaction="item" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-skeleton-loader type="list@5" />
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
import auth from '@/store/modules/auth';

@Component({
  components: {
    AppTransactionItem: () =>
      import("@/components/transaction/TransactionListItem.vue"),
    TransactionFilterBar: () => import('@/components/transaction/TransactionFilterBar.vue')
  },
})
export default class TransactionsView extends Vue {
  loading = false

  get transactions():Transaction[]{
    return finances.transactions;
  }

  get receitasTotais () {
    var receitas = this.transactions.filter(t => t.type == TransactionType.DEBIT)
    return receitas.reduce((acc, cur) => acc + cur.amount, 0);
  }

  filter = { 
    year : new Date().getFullYear(),
    month : new Date().getMonth()+1,
    user: auth.userId
  }

  async filterTransaction() {
    this.loading = true
    await finances.filterTransactions(this.filter)
    this.loading = false
  }

}
</script>
