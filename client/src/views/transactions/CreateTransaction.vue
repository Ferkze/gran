<template>
  <v-container class>
    <h1 class="display-1">{{ $route.name }}</h1>
    <v-row>
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
                <base-date-picker v-model="transaction.date" hide-details />
              </base-form-field>
              <base-form-field
                v-if="transaction.type == 'transference'"
                v-model="transaction.account"
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
                v-model="transferenceTo"
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
                v-model="transaction.account"
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
                v-model="transaction.account"
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
        </section>
      </v-col>
      <v-col cols="6">
        <section>
          <v-card>
            <v-card-title>
              <h2 class="title font-weight-medium my-2">Informações adicionais</h2>
            </v-card-title>
            <v-card-text>
              <base-form-field
                v-model="transaction.categories"
                form-label="Categorias"
                hide-details
                label="Categorias da transação"
              >
                <v-combobox
                  v-model="transaction.categories"
                  :items="categories"
                  background-color="grey lighten-3"
                  chips
                  clearable
                  flat
                  item-text="name"
                  return-object
                  hide-selected
                  label="Categorias dessa transação"
                  multiple
                  prepend-icon="mdi-label"
                  solo
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      :color="item.colors ? item.colors.primary : 'primary'"
                      class="white--text"
                      close
                      @click="select"
                      @click:close="remove(item)"
                    >
                      <span class="font-weight-regular">{{ item.name }}</span>
                    </v-chip>
                  </template>
                </v-combobox>
              </base-form-field>
              <!-- <v-row>
                <v-col cols="12">
                  
                </v-col>
              </v-row>-->
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
import { AccountSubtypes, TransactionType } from "../../models/enums";
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
  name: "CreateTransactionView",
})
export default class CreateTransactionView extends Vue {
  transferenceTo: Account['id'] = ''

  remove(item: Category) {
    const index = this.transaction.categories.findIndex((c) => c.id == item.id);
    this.transaction.categories.splice(index, 1);
  }

  types = [
    { value: TransactionType.CREDIT, text: "Despesa" },
    { value: TransactionType.DEBIT, text: "Receita" },
    { value: TransactionType.TRANSFERENCE, text: "Transferência" },
  ];

  transaction: Transaction = {
    type: TransactionType.DEBIT,
    amount: 0,
    description: "",
    categories: [],
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
    return finances.accounts;
  }
  get categories() {
    return finances.categories;
  }

	async created() {
		if (!finances.accounts.length) {
			const accs = await finances.fetchAccounts()
			if (!accs || !accs.length) {
				status.setStatus({
					type: 'error',
					message: `Adicione uma conta para começar a registrar transações`
				})
				this.$router.push('/dashboard/contas')
				return
			}
		}
		if (!finances.categories.length) {
			const cats = await finances.fetchCategories()
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
      this.$router.push("/dashboard/transactions");
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
