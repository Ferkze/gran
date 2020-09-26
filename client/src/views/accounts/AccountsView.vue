<template>
  <v-container>
    <h1 class="display-1 mb-3">{{ $route.name }}</h1>
    <h2 class="font-weight-light">Minhas contas</h2>
    <v-divider />
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="acc in debitAccounts" :key="acc.id">
        <account-card :account="acc" />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot:default="{ hover }">
          <v-btn height="100%" min-height="198" block color="primary" :outlined="!hover" @click="createAccount">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-icon large left>mdi-bank-plus</v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">Adicionar conta</v-col>
              </v-row>
            </v-container>
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AccountTypes } from "../../models/enums";
import accounts from "../../store/modules/accounts";

@Component({
  name: "AccountsView",
  components: {
    AccountCard: () => import("../../components/AccountCard.vue"),
  },
})
export default class Accounts extends Vue {
  menuItems = [{ title: "Editar", action: "edit" }];

  mounted() {
    if (accounts.accounts.length == 0) {
      accounts.fetchAccounts();
    }
  }

  get debitAccounts() {
    return accounts.accounts.filter((a) => a.type == AccountTypes.DEBIT);
  }
  get creditAccounts() {
    return accounts.accounts.filter((a) => a.type == AccountTypes.CREDIT);
  }

  createAccount() {
    this.$router.push("/contas/criar");
  }
  createCreditCard() {
    alert("ok");
  }

  onAccountMenuClicked(accountId: string, action: string) {
    switch (action) {
      case "edit":
        this.$router.push(`/contas/${accountId}`);
        break;
    }
  }
}
</script>
