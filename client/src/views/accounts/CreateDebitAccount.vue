<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Criar conta</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <account-form :data.sync="account" @submit="createAccount" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User, Account } from "@/models";
import { AccountSubtypes, AccountTypes } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import auth from "@/store/modules/auth";
import finances from "@/store/modules/finances";
import status from "@/store/modules/status";

@Component({
  components: {
    AccountForm: () => import("@/components/account/AccountForm.vue"),
  }
})
export default class Settings extends Vue {
  account: Account = {
    name: "",
    main: false,
    unregisteredInstitution: "",
    type: AccountTypes.DEBIT,
    subtype: AccountSubtypes.CURRENT,
    startingBalance: 0,
  };
  loading = false;

  mounted() {
    finances.fetchInstitutions();
  }

  async createAccount() {
    this.loading = true;
    try {
      await accounts.createAccount(this.account);
      status.setStatus({
        type: "success",
        message: "Conta criada com sucesso",
      });
      this.$router.push("/contas");
    } catch (error) {
      status.setStatus({
        type: "error",
        message: `Não foi possível cria a conta: ${error.toString()}`,
      });
      status.setError(error);
    } finally {
      this.loading = true;
    }
  }
}
</script>
