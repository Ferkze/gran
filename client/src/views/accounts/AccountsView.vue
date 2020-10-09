<template>
  <v-container>
    <v-card height="100%">
      <v-row no-gutters align="center">
        <v-col>
          <v-card-title>
            <h2 class="title font-weight-medium">Contas</h2>
          </v-card-title>
        </v-col>
        <v-col class="text-right px-4">
          <v-btn class="primary px-6" depressed to="/contas/criar">
            <span class="text-lowercase">adicionar conta</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-list width="100%">
          <account-list-item v-for="acc in debitAccounts" :key="acc.id" :account="acc" />
        </v-list>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AccountTypes } from "@/models/enums";
import accounts from "@/store/modules/accounts";

@Component({
  name: "AccountsView",
  components: {
    AccountListItem: () => import("@/components/account/AccountListItem.vue"),
  },
})
export default class Accounts extends Vue {
  menuItems = [{ title: "Editar", action: "edit" }];

  loading = false
  mounted() {
    if (accounts.accounts.length == 0) {
      this.loadAccounts()
    }
  }

  get debitAccounts() {
    return accounts.accounts.filter((a) => a.type == AccountTypes.DEBIT);
  }

  async loadAccounts() {
    this.loading = false
    await accounts.fetchAccounts();
    this.loading = true
  }

}
</script>
