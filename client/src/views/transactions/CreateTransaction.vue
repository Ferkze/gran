<template>
  <v-container class>
    <h1 class="display-1">{{ $route.name }}</h1>
    <v-row>
      <v-col cols="6">
        <section>
          <v-card>
            <v-card-title>
              <h2 class="title font-weight-medium">Dados da transação</h2>
            </v-card-title>
            <v-card-text>
              <div>
                <v-subheader>Tipo de transação</v-subheader>
                <v-chip-group v-model="transaction.type" active-class="darken-2 white--text">
                  <v-chip
                    v-for="item in types"
                    :key="item.value"
                    :value="item.value"
                    :class="`${item.color} lighten-4`"
                    v-text="item.text"
                  />
                </v-chip-group>
              </div>
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
                label="Conta debitada"
              />
              <base-form-field
                v-if="transaction.type == 'credit'"
                v-model="transaction.account"
                field-type="select"
                :items="accounts"
                form-label="Conta creditada"
                item-text="name"
                item-value="id"
                hide-details
                label="Conta creditada"
              />
              <base-form-field
                v-if="transaction.type == 'debit'"
                v-model="transaction.account"
                field-type="select"
                :items="accounts"
                form-label="Conta debitada"
                item-text="name"
                item-value="id"
                hide-details
                label="Conta debitada"
              />
            </v-card-text>
          </v-card>
        </section>
      </v-col>
      <v-col cols="6">
        <section>
          <v-card>
            <v-card-title>
              <h2 class="title font-weight-medium">Categoria</h2>
            </v-card-title>
            <v-card-text>
              <div>
                <v-subheader>Categoria</v-subheader>
                <v-chip-group v-model="transaction.category" column active-class="primary--text">
                  <v-chip v-for="chip in categories" :key="chip.id" :value="chip.id" v-text="chip.name" />
                </v-chip-group>
              </div>
            </v-card-text>
          </v-card>
          <div class="mt-4">
            <v-btn
              block
              color="primary"
              :disabled="loading"
              :loading="loading"
              large
              @click="createTransaction"
            >Criar Transação</v-btn>
          </div>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import auth from "../../store/modules/auth";
import { User, Transaction, Category } from "../../models";
import {
  AccountSubtypes,
  CategoryType,
  TransactionType,
} from "../../models/enums";
import accounts from "../../store/modules/accounts";
import finances from "../../store/modules/finances";
import status from "../../store/modules/status";

import BaseFormField from "@/components/base/FormField.vue";
import BaseTextField from "@/components/base/TextField.vue";
import BaseDatePicker from "@/components/base/DatePicker.vue";
import BaseSelect from "@/components/base/Select.vue";

@Component({
  components: {
    BaseTextField,
    BaseFormField,
    BaseDatePicker,
    BaseSelect,
  },
})
export default class CreateTransactionView extends Vue {
  transferenceTo: Account["id"] = "";

  types = [
    { value: TransactionType.CREDIT, text: "Despesa", color: "red" },
    { value: TransactionType.DEBIT, text: "Receita", color: "green" },
    {
      value: TransactionType.TRANSFERENCE,
      text: "Transferência",
      color: "blue",
    },
  ];
  transaction: Transaction = {
    account: "",
    user: auth.user?.id || "",
    type: TransactionType.DEBIT,
    amount: 0,
    description: "",
    category: "",
    date: new Date().toISOString().substr(0, 10),
  };
  loading = false;
  accountTypes = [
    { text: "Carteira", value: AccountSubtypes.CURRENCY },
    { text: "Carteira Digital", value: AccountSubtypes.DIGITAL_CURRENCY },
    { text: "Transação Corrente", value: AccountSubtypes.CURRENT },
    { text: "Transação em Corretora", value: AccountSubtypes.BROKER },
  ];

  get user(): User | null {
    return auth.user;
  }
  get accounts() {
    return accounts.accounts;
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

  get amount(): string {
    const amount = this.transaction.amount || 0;
    if (amount - Math.ceil(amount) !== 0) {
      return amount.toFixed(2).replace(".", ",");
    }
    return amount.toString();
  }
  set amount(str: string) {
    str.replace(/\D/g, "");
    if (str == "") str = "0";
    this.transaction.amount = parseFloat(str.replace(",", "."));
  }

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
