<template>
  <v-card class="mb-3" color="grey lighten-3" flat>
    <v-row no-gutters :class="`pa-2`" align="center">
      <v-col cols="8" md="6" lg="5">
        <v-row no-gutters>
          <v-col cols="1">
            <v-progress-linear :color="typeColor" value="100" class="custom-bar" height="100%"></v-progress-linear>
          </v-col>
          <v-col cols="11" class="ml-0 ml-md-n4 ml-lg-n5">
            <div class="font-weight-bold">{{ transaction.description }}</div>
            <div class="text-caption">{{ transaction.date.substr(0, 10) | formatDate }}</div>
            <div class="text-caption">
              {{ transaction.category | categoryName }}
              <span v-if="hasCategoryAndAccount"> | </span>
              {{ transaction.account | accountName }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
      <v-col cols="3" md="2">
        <div :class="`${typeColor}--text text-right`">R$ {{ transaction.amount | formatCurrency }}</div>
      </v-col>
      <v-col cols="1" class="text-right pr-3">
        <div>
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in menuItems" :key="item.action" @click="onMenuItemSelected(item.action)">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Transaction, Account } from "@/models";
import { TransactionType } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import finances from "@/store/modules/finances";
import status from "@/store/modules/status";

@Component
export default class TransactionListItem extends Vue {
  @Prop({ type: Object, required: true }) transaction!: Transaction;

  menuItems = [
  	{ text: "Editar", action: "edit" },
  	{ text: "Deletar", action: "delete" },
  ];

  get account(): Account | undefined {
  	return accounts.accounts.find(acc => acc.id == this.transaction.account);
  }
  get typeColor(): string {
  	switch (this.transaction.type) {
  		case TransactionType.DEBIT: {
  			return "success";
  		}
  		case TransactionType.CREDIT: {
  			return "error";
  		}
  		case TransactionType.TRANSFERENCE: {
  			return "info";
  		}
  		default: {
  			return "grey";
  		}
  	}
  }

  get hasCategoryAndAccount() {
  	return !!this.transaction.category && !!this.transaction.account
  }

  async onMenuItemSelected(action: string) {
  	switch (action) {
  		case "edit":
  			this.$router.push(`/transacoes/${this.transaction.id}/edicao`);
  			break;
  		case "delete":
  			finances.deleteTransaction(this.transaction);
  			break;
  		default:
  			break;
  	}
  }
}
</script>

<style scoped>
.custom-bar {
  border-radius:3px;
  width:6px
}
</style>
