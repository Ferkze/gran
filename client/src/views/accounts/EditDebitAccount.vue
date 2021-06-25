<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Editar conta</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <account-form :data.sync="account" @submit="updateAccount" />
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
import auth from "../../store/modules/auth";
import { User, Account, Institution } from "../../models";
import { AccountSubtypes } from "../../models/enums";
import finances from "../../store/modules/finances";
import status from "../../store/modules/status";
import accounts from "../../store/modules/accounts";

@Component({
	components: {
		AccountForm: () => import("@/components/account/AccountForm.vue"),
	}
})
export default class EditDebitAccountView extends Vue {
  loading = false

  mounted() {
  	finances.fetchInstitutions()
  }

  get account(): Account | undefined {
  	const acc = accounts.accounts.find(
  		(a) => a.id == this.$route.params.accountId
  	);
  	if (!acc) {
  		this.$router.go(-1);
  		return undefined;
  	}
  	return acc;
  }
  set account(acc: Account | undefined) {
  	if (!acc) return;
  	accounts.replaceAccount(acc);
  }

  async updateAccount() {
  	if (!this.account) {
  		return;
  	}
  	this.loading = true;
  	try {
  		await accounts.changeAccount(this.account);
  		status.setStatus({
  			type: "success",
  			message: "Conta atualizada com sucesso",
  		});
  		this.$router.push("/contas");
  	} catch (error) {
  		status.setStatus({
  			type: "error",
  			message: `Não foi possível atualizar a conta: ${error.toString()}`,
  		});
  		status.setError(error);
  	} finally {
  		this.loading = true;
  	}
  }

}
</script>
