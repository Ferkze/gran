<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
    <v-row>
      <v-col cols="6">
        <section>
          <h2 class="font-weight-light">Ultimas</h2>
          <v-list>
            <app-transaction-item v-for="item in transactions" :key="item._id" :transaction="item" />
          </v-list>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import finances from '../../store/modules/finances'

@Component({
  components: {
    AppTransactionItem: () => import('../../components/TransactionListItem.vue')
  },
  name: 'TransactionsView'
})
export default class Transactions extends Vue {
  get transactions() {
    return finances.transactions
  }

  mounted() {
    if (this.transactions.length <= 1) {
      finances.fetchTransactions()
    }
  }
}
</script>
