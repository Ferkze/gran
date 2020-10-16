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
                    <v-icon large color="white">mdi-plus</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Registrar</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="info">
                    <v-icon right large color="white">mdi-bank-transfer</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Total</v-list-item-subtitle>
                  <v-list-item-title>R$ 24000</v-list-item-title>
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
import { TransactionType } from "@/models/enums";
import auth from '@/store/modules/auth';

@Component({
  components: {
    TransactionsList: () => import("@/components/transaction/TransactionsList.vue"),
    TransactionFilterBar: () => import('@/components/transaction/TransactionFilterBar.vue')
  }
})
export default class TransferencesView extends Vue {
  get transactions() {
    return finances.transactions.filter(
      (t) => t.type == TransactionType.TRANSFERENCE
    );
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
