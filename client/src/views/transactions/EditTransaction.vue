<template>
  <v-container class>
    <h1 class="display-1">{{ $route.name }}</h1>
    <v-row v-if="!loading && transaction">
      <v-col cols="6">
        <section>
          <v-card>
            <v-card-title>
              <h2 class="title font-weight-medium my-2">Dados principais</h2>
            </v-card-title>
            <v-card-text>
              <base-form-field
                v-model="transaction.type"
                :items="types"
                field-type="select"
                form-label="Tipo"
                hide-details
                label="Tipo de transação"
              />
              <base-form-field
                v-model="transaction.description"
                field-type="text-field"
                form-label="Descrição"
                hide-details
                label="Descrição da transação"
              />
              <base-form-field
                v-model="amount"
                field-type="text-field"
                form-label="Valor"
                hide-details
                label="Valor da transação"
                prefix="R$"
              />
              <base-form-field form-label="Data" hide-details label="Data da transação">
                <base-date-picker disabled v-model="transaction.date" hide-details />
              </base-form-field>
              <base-form-field
                v-if="transaction.type == 'transference'"
                v-model="transaction.creditAccount"
                field-type="select"
                :items="accounts"
                form-label="Tranferir da conta"
                item-text="name"
                return-object
                hide-details
                label="Conta creditada"
              />
              <base-form-field
                v-if="transaction.type == 'transference'"
                v-model="transaction.debitAccount"
                field-type="select"
                :items="accounts"
                form-label="Para a conta"
                item-text="name"
                return-object
                hide-details
                label="Conta debitada"
              />
              <base-form-field
                v-if="transaction.type == 'credit'"
                v-model="transaction.creditAccount"
                field-type="select"
                :items="accounts"
                form-label="Conta creditada"
                item-text="name"
                return-object
                hide-details
                label="Conta creditada"
              />
              <base-form-field
                v-if="transaction.type == 'debit'"
                v-model="transaction.debitAccount"
                field-type="select"
                :items="accounts"
                form-label="Conta debitada"
                item-text="name"
                return-object
                hide-details
                label="Conta debitada"
              />
            </v-card-text>
          </v-card>
          <div class="mt-4">
            <v-btn
              block
              color="primary"
              :disabled="loadingEdition"
              :loading="loadingEdition"
              large
              @click="updateTransaction"
            >Atualizar Transação</v-btn>
          </div>
          <div class="mt-4">
            <v-btn
              block
              color="error"
              outlined
              :disabled="loadingDeletion"
              :loading="loadingDeletion"
              large
              @click="deleteTransaction"
            >Deletar Transação</v-btn>
          </div>
        </section>
      </v-col>
      <v-col cols="6" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import auth from "../../store/modules/auth";
import { User, Transaction } from "../../models";
import { AccountSubtypes, TransactionType } from "../../models/enums";
import finances from "../../store/modules/finances";
import status from "../../store/modules/status";
import TransactionService from "../../service/api/TransactionService";

import BaseDatePicker from "@/components/base/DatePicker.vue";
import BaseFormField from "@/components/base/FormField.vue";

@Component({
  components: {
    BaseDatePicker,
    BaseFormField,
  },
  name: "EditDebitAccountView",
})
export default class EditDebitAccount extends Vue {
  loading = false;
  loadingEdition = false;
  loadingDeletion = false;
  accountTypes = [
    { text: "Carteira", value: AccountSubtypes.CURRENCY },
    { text: "Carteira Digital", value: AccountSubtypes.DIGITAL_CURRENCY },
    { text: "Transação Corrente", value: AccountSubtypes.CURRENT },
    { text: "Transação em Corretora", value: AccountSubtypes.BROKER },
  ];

  types = [
    { value: TransactionType.CREDIT, text: "Despesa" },
    { value: TransactionType.DEBIT, text: "Receita" },
    { value: TransactionType.TRANSFERENCE, text: "Transferência" },
  ];

  get user(): User | null {
    return auth.user;
  }
  get accounts() {
    return finances.accounts;
  }

  get amount(): string {
    if (!this.transaction) return "";
    const amount = this.transaction.amount || 0;
    if (amount - Math.ceil(amount) !== 0) {
      return amount.toFixed(2).replace(".", ",");
    }
    return amount.toString();
  }
  set amount(str: string) {
    if (!this.transaction) return;
    str.replace(/\D/g, "");
    if (str == "") str = "0";
    this.transaction.amount = parseFloat(str.replace(",", "."));
  }

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

  async created() {
    if (!this.$route.params.transactionId) {
      this.$router.go(-1);
      return;
    }
    if (!finances.transactions.length) {
      await this.getTransaction(this.$route.params.transactionId);
    }
    if (!finances.accounts.length) {
      const accs = await finances.fetchAccounts();
      if (!accs || !accs.length) {
        this.$router.go(-1);
      }
    }
    if (!finances.categories.length) {
      const cats = await finances.fetchCategories();
      if (!cats || !cats.length) {
        this.$router.go(-1);
      }
    }
  }

  beforeDestroy() {
    if (finances.transactions.length == 1 && this.transaction) {
      finances.removeTransaction(this.transaction);
    }
  }

  async getTransaction(transactionId: string) {
    this.loading = true;
    const { data: tt } = await TransactionService.getTransaction(transactionId);
    if (!tt) {
      this.loading = false;
      return;
    }
    finances.setTransactions([tt]);
    this.loading = false;
  }

  async updateTransaction() {
    if (!this.transaction) return;
    this.loadingEdition = true;
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
      this.loadingEdition = true;
    }
  }

  async deleteTransaction() {
    if (!this.transaction) return;
    this.loadingDeletion = true;
    try {
      await finances.deleteTransaction(this.transaction);
      status.setStatus({
        type: "success",
        message: "Transação deletada com sucesso",
      });
      this.$router.push("/contas");
    } catch (error) {
      status.setStatus({
        type: "error",
        message: `Não foi possível deletar a transação: ${error.toString()}`,
      });
      status.setError(error);
    } finally {
      this.loadingDeletion = true;
    }
  }
}
</script>
