<template>
  <v-form @submit.prevent="submitBudget">
    <base-form-field
      v-model="budget.category"
      field-type="select"
      :items="categories"
      form-label="Categoria de gasto"
      item-text="name"
      item-value="id"
      hide-details
      label="Selecione uma categoria"
      :disabled="loading"
    />
    <base-form-field
      v-model="budget.value"
      field-type="currency-field"
      form-label="Gasto na categoria esperado para o mês"
      prefix="R$"
      hide-details
      label="Rendimento"
      :disabled="loading"
    />
    <div class="text-center">
      <v-btn
        type="submit"
        block
        color="primary"
        class="mt-5"
        large
        outlined
        :disabled="loading"
        :loading="loading"
        @submit.prevent="submitBudget"
      >Adicionar</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";
import { Budget } from "@/models";
import { AccountSubtypes, CategoryType } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import finances from '@/store/modules/finances';
import groupsModule from "@/store/modules/groupsModule";
import status from '@/store/modules/status';

@Component({
  components: {
    BaseDatePicker: () => import("@/components/base/DatePicker.vue"),
    BaseFormField: () => import("@/components/base/FormField.vue"),
  },
})
export default class ExpenseBudgetForm extends Vue {
  @PropSync("data", { required: true })
  budget!: Budget;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  types = [
    { value: CategoryType.EXPENSE, text: "Despesa", color: 'error' },
    { value: CategoryType.INCOME, text: "Receita", color: 'success' },
  ];

  transferenceTo: Account["id"] = "";

  groupFormEnabled = true

  async created() {
    if (!accounts.accounts.length) {
      const accs = await accounts.fetchAccounts();
      if (!accs || !accs.length) {
        status.setStatus({
          type: "error",
          message: `Adicione uma conta para começar a registrar transações`,
        });
        this.$router.push("/contas");
        return;
      }
    }
    if (!finances.categories.length) {
      const cats = await finances.fetchCategories();
    }
  }
  
  get groups() {
    return groupsModule.groups
  }
  
  get categories() {
    return finances.categories.filter((cat) => cat.type == this.budget.type);
  }

  @Emit("submit")
  async submitBudget() {}
}
</script>
