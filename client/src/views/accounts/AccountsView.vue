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
    <h2 class="font-weight-light">Meus cartões de crédito</h2>
    <v-divider />
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="acc in creditAccounts" :key="acc.id">
        <v-card>
          <v-card-title>
            <v-row no-gutters>
              <v-col cols="6">
                <span>{{ acc.name }}</span>
              </v-col>
              <v-col cols="6" class="text-right">
                <span>
                  <v-btn icon color="primary">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <p>
              Saldo
              <span class="font-weight-black float-right">R$ {{ acc.startingBalance | formatCurrency }}</span>
            </p>
            <p>
              Instituição
              <span class="font-weight-black float-right">{{ acc.institution }}</span>
            </p>
            <p>Criado em {{ acc.createdAt.substring(0, 10) }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot:default="{ hover }">
          <v-btn
            disabled
            height="100%"
            min-height="198"
            block
            color="primary"
            :outlined="!hover"
            @click="createCreditCard"
          >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-icon large left>mdi-credit-card-plus</v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">Adicionar cartão</v-col>
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
import finances from "../../store/modules/finances";
import { AccountTypes } from "../../models/enums";

@Component({
  name: "AccountsView",
  components: {
    AccountCard: () => import("../../components/AccountCard.vue"),
  },
})
export default class Accounts extends Vue {
  menuItems = [{ title: "Editar", action: "edit" }];

  mounted() {
    finances.fetchAccounts();
  }

  get debitAccounts() {
    return finances.accounts.filter((a) => a.type == AccountTypes.DEBIT);
  }
  get creditAccounts() {
    return finances.accounts.filter((a) => a.type == AccountTypes.CREDIT);
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
