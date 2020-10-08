<template>
  <v-form @submit.prevent="updateTransaction">
    <base-form-field
      v-model="transaction.type"
      :items="types"
      field-type="select"
      form-label="Tipo de transação"
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
    <base-form-field form-label="Data" hide-details label="Data da transação">
      <base-date-picker v-model="transaction.date" hide-details />
    </base-form-field>
    <base-form-field
      v-if="transaction.type == 'transference'"
      v-model="transaction.account"
      field-type="select"
      :items="accounts"
      form-label="Tranferir da conta"
      item-text="name"
      item-value="id"
      hide-details
      label="Conta creditada"
    />
    <base-form-field
      v-if="transaction.type == 'transference'"
      v-model="transferenceTo"
      field-type="select"
      :items="accounts"
      form-label="Para a conta"
      item-text="name"
      item-value="id"
      hide-details
      label="Conta que recebeu a tranferência"
    />
    <base-form-field
      v-model="transaction.account"
      field-type="select"
      :items="accounts"
      form-label="Conta"
      item-text="name"
      item-value="id"
      hide-details
      label="Conta"
    />
    <base-form-field
      v-model="transaction.category"
      field-type="select"
      :items="categories"
      form-label="Categoria"
      item-text="name"
      item-value="id"
      hide-details
      label="Selecione uma categoria"
    />
    <base-form-field
      v-if="groups.length > 0"
      v-model="transaction.group"
      field-type="select"
      :items="groups"
      no-data-text="Nenhum grupo disponível"
      form-label="Grupo (opcional)"
      item-text="name"
      item-value="id"
      hide-details
      label="Grupo"
    />
    <div class="font-weight-light text-center mt-4">Valor da transação</div>
    <v-text-field
      v-model="transaction.amount"
      class="mt-0"
      prefix="R$ "
      type="number"
    />
    <div class="text-center">
      <v-btn
        type="submit"
        block
        color="primary"
        class="mt-5"
        :disabled="loading"
        :loading="loading"
        large
        @submit.prevent="updateTransaction"
      >Salvar</v-btn>
    </div>
    <!-- <v-btn block color="error" class="mt-5" outlined :disabled="loadingDeletion" :loading="loadingDeletion" large @click="deleteTransaction">Deletar Transação</v-btn>-->
  </v-form>
</template>

<script lang="ts">
import { Transaction } from "@/models";
import { AccountSubtypes, CategoryType, TransactionType } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import finances from '@/store/modules/finances';
import groups from "@/store/modules/groups";
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  components: {
    BaseDatePicker: () => import("@/components/base/DatePicker.vue"),
    BaseFormField: () => import("@/components/base/FormField.vue"),
  },
})
export default class TransactionForm extends Vue {
  @PropSync("data", { required: true })
  transaction!: Transaction;

  @Prop({ type: String, default: 'create' })
  submitType!: string

  loading = false;

  types = [
    { value: TransactionType.CREDIT, text: "Despesa", color: 'error' },
    { value: TransactionType.DEBIT, text: "Receita", color: 'success' },
    { value: TransactionType.TRANSFERENCE, text: "Transferência", color: 'info' },
  ];

  transferenceTo: Account["id"] = "";

  get accounts() {
    return accounts.accounts;
  }

  get groups() {
    return groups.groups
  }
  
  get categories() {
    return finances.categories.filter((cat) => {
      switch (this.transaction.type) {
        case TransactionType.DEBIT:
          return cat.type == CategoryType.INCOME;
          break;
        case TransactionType.CREDIT:
          return cat.type == CategoryType.EXPENSE;
          break;

        default:
          return true;
          break;
      }
    });
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

  @Emit("submit")
  async updateTransaction() {}
}
</script>
