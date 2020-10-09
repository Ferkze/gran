<template>
  <v-container class>
    <v-card>
      <v-row no-gutters>
        <v-col cols="3" class="pa-3">
          <v-btn
            to="/transacoes/"
            exact
            active-class="primary"
            block
            color="grey"
            class="white--text"
            depressed
            small
          >
            <span class="text-lowercase">transações</span>
          </v-btn>
        </v-col>
        <v-col cols="3" class="pa-3">
          <v-btn
            to="/transacoes/receitas"
            active-class="success"
            block
            color="grey"
            class="white--text"
            depressed
            small
          >
            <span class="text-lowercase">receitas</span>
          </v-btn>
        </v-col>
        <v-col cols="3" class="pa-3">
          <v-btn
            to="/transacoes/despesas"
            active-class="error"
            block
            color="grey"
            class="white--text"
            depressed
            small
          >
            <span class="text-lowercase">despesas</span>
          </v-btn>
        </v-col>
        <v-col cols="3" class="pa-3">
          <v-btn
            to="/transacoes/transferencias"
            active-class="info"
            block
            color="grey"
            class="white--text"
            depressed
            small
          >
            <span class="text-lowercase">transferências</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-slide-x-reverse-transition mode="out-in">
        <router-view />
      </v-slide-x-reverse-transition>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import finances from "../../store/modules/finances";

@Component
export default class TransactionsRouterView extends Vue {
  get transactions() {
    return finances.transactions;
  }

  mounted() {
    if (this.transactions.length < 2) {
      finances.fetchTransactions();
    }
  }

}
</script>
