<template>
  <v-container>
    <v-row class="fill-height" justify="center" v-if="!loading && transaction">
      <v-col cols="8" xs="12">
        <v-card height="100%">
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Editar transação</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <transaction-form :data.sync="transaction" :loading="loading" @submit="updateTransaction" />
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
import { User, Transaction } from "@/models";
import { AccountSubtypes, TransactionType } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import auth from "@/store/modules/auth";
import finances from "@/store/modules/finances";
import status from "@/store/modules/status";
import TransactionService from "@/service/api/TransactionService";


@Component({
  components: {
    TransactionForm: () => import('@/components/transaction/TransactionForm.vue')
  }
})
export default class EditDebitAccount extends Vue {
  loading = false;

  get transaction(): Transaction | undefined {
    const transactionId = this.$route.params.transactionId;
    const tt = finances.transactions.find((a) => a.id == transactionId);
    if (!tt && transactionId) {
      this.getTransaction(transactionId);
      return undefined;
    }
    return tt;
  }
  set transaction(transaction: Transaction | undefined) {
    if (!transaction) return;
    finances.replaceTransaction(transaction);
  }

  beforeDestroy() {
    if (finances.transactions.length == 1 && this.transaction) {
      finances.removeTransaction(this.transaction);
    }
  }

  async getTransaction(transactionId: string) {
    this.loading = true;
    const tt = await TransactionService.getTransaction(transactionId);
    if (!tt) {
      this.loading = false;
      return;
    }
    finances.setTransactions([tt]);
    this.loading = false;
  }

  async updateTransaction() {
    if (!this.transaction) return;
    this.loading = true;
    try {
      await finances.changeTransaction(this.transaction);
      status.setStatus({
        type: "success",
        message: "Transação atualizada com sucesso",
      });
      this.$router.push("/contas");
    } catch (error) {
      status.setStatus({
        type: "error",
        message: `Não foi possível atualizar a conta: ${error.toString()}`,
      });
      status.setError(error);
    } finally {
      this.loading = true;
    }
  }

  // async deleteTransaction() {
  //   if (!this.transaction) return;
  //   this.loadingDeletion = true;
  //   try {
  //     await finances.deleteTransaction(this.transaction);
  //     status.setStatus({
  //       type: "success",
  //       message: "Transação deletada com sucesso",
  //     });
  //     this.$router.push("/contas");
  //   } catch (error) {
  //     status.setStatus({
  //       type: "error",
  //       message: `Não foi possível deletar a transação: ${error.toString()}`,
  //     });
  //     status.setError(error);
  //   } finally {
  //     this.loadingDeletion = true;
  //   }
  // }
}
</script>
