<template>
  <v-list-item>
    <v-list-item-icon v-if="institution">
      <account-logo :image-url="institution.imageUrl" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-row>
        <v-col>
          <v-list-item-title>
            <span class="font-weight-medium">{{ account.name }}</span>
            <span class="text-body-2 font-weight-light float-right">Saldo atual</span>
          </v-list-item-title>
        </v-col>
        <v-col v-if="account.balance">
          <div class="success--text">R$ {{ account.balance | formatCurrency }}</div>
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-list-item-action>
      <v-row>
        <v-btn class="mx-3" icon to="transacoes">
          <v-icon color="grey darken-4">mdi-format-list-text</v-icon>
        </v-btn>
        <v-btn class="mx-3" icon>
          <v-icon color="grey darken-4">mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn class="mx-3" icon :to="`/contas/${account.id}`">
          <v-icon color="grey darken-4">mdi-square-edit-outline</v-icon>
        </v-btn>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Account } from "@/models";
import accounts from "@/store/modules/accounts";
import finances from "@/store/modules/finances";
import status from "@/store/modules/status";
import { Component, Prop, Vue } from "vue-property-decorator";
import AccountLogo from "./AccountLogo.vue";

@Component({
	components: {
		AccountLogo,
	},
})
export default class AccountListItem extends Vue {
  @Prop({ required: true, type: Object })
  account!: Account;

  loading = false;

  mounted() {
  	console.log(this.account);
  }

  get institution() {
  	return finances.bankInstitutions.find(
  		(i) => i.id == this.account.institution
  	);
  }

  async deleteAccount() {
  	if (!this.account) {
  		return;
  	}
  	this.loading = true;
  	try {
  		await accounts.deleteAccount(this.account);
  		status.setStatus({
  			type: "success",
  			message: "Conta deletada com sucesso",
  		});
  		this.$router.push("/contas");
  	} catch (error) {
  		status.setStatus({
  			type: "error",
  			message: `Não foi possível deletar a conta: ${error.toString()}`,
  		});
  		status.setError(error);
  	} finally {
  		this.loading = true;
  	}
  }
}
</script>

<style scoped>
</style>