<template>
  <v-container class>
    <h1 class="display-1">{{ $route.name }}</h1>
    <section>
      <v-row no-gutters>
        <v-col cols="6">
          <div class="text-left">
            <h2 class="font-weight-light">Registros</h2>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-right">
            <v-btn class="primary" text to="/transacoes/criar">Nova transação</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <app-transaction-item v-for="item in transactions" :key="item.id" :transaction="item" />
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import finances from "../../store/modules/finances";
import status from "../../store/modules/status";

@Component({
  components: {
    AppTransactionItem: () =>
      import("../../components/TransactionListItem.vue"),
  }
})
export default class TransactionsView extends Vue {
  get transactions() {
    return finances.transactions;
  }

  mounted() {
    if (this.transactions.length <= 1) {
      finances.fetchTransactions();
    }
  }
}
</script>
