<template>
  <v-card>
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="6">
          <span>{{ account.name }}</span>
        </v-col>
        <v-col cols="6" class="text-right">
          <span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon color="primary">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="onAccountMenuClicked(account.id, item.action)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-skeleton-loader
        v-if="loadingBalance"
        class="mt-1 mb-4"
        type="text"
      />
      <p v-else-if="balance">
        Saldo atual
        <span class="font-weight-black float-right">R$ {{ balance | formatCurrency }}</span>
      </p>
      <p>
        Instituição
        <span class="font-weight-black float-right">{{ accountInstitution }}</span>
      </p>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn text small>
        Transações
        <v-icon small right>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Account } from "../models";
import accounts from "../store/modules/accounts";
import finances from "../store/modules/finances";

@Component
export default class AccountCard extends Vue {
  @Prop({ required: true, type: Object })
  account!: Account;

  loadingBalance = false

  menuItems = [{ title: "Editar", action: "edit" }];

  async mounted() {
    if (!this.balance) {
      this.loadingBalance = true
      await accounts.getAccountBalance(this.account.id)
      this.loadingBalance = false
    }
  }

  get accountInstitution() {
    if (!this.account) {
      return 'Não registrado'
    }
    return this.account.name
  }

  get balance() {
    return this.account.balance
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
