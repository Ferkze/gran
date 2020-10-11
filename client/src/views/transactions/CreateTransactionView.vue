<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Criar transação</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <transaction-form :data.sync="transaction" :loading="loading" @submit="createTransaction" />
              </v-col>
            </v-row>  
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User, Transaction, Category } from "@/models";
import { AccountSubtypes, CategoryType, TransactionType } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import auth from "@/store/modules/auth";
import finances from "@/store/modules/finances";
import status from "@/store/modules/status";

@Component({
  components: {
    TransactionForm: () =>
      import("@/components/transaction/TransactionForm.vue"),
  },
})
export default class CreateTransactionView extends Vue {

  transaction: Transaction = {
    account: '',
    user: auth.user?.id || '',
    type: TransactionType.DEBIT,
    amount: 0,
    description: '',
    category: '',
    group: '',
    date: new Date().toISOString().substr(0, 10),
  };
  loading = false

  async createTransaction() {
    this.loading = true;
    try {
      await finances.newTransaction(this.transaction);
      status.setStatus({
        type: "success",
        message: "Transação criada com sucesso",
      });
      this.$router.push("/transacoes");
    } catch (error) {
      status.setStatus({
        type: "error",
        message: `Não foi possível criar a transação: ${error.toString()}`,
      });
      status.setError(error);
    } finally {
      this.loading = true;
    }
  }
}
</script>
