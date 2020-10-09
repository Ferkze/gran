<template>
  <v-form @submit.prevent="submitAccount">
    <base-form-field
			v-model="account.name"
			field-type="text-field"
			form-label="Nome da conta"
			flat
			solo
			hide-details
			label="Nome da conta"
		/>
    <base-form-field
			v-model="account.subtype"
			:items="accountTypes"
			field-type="select"
			form-label="Tipo de conta"
			hide-details
			label="Tipo de conta"
		/>
		<base-form-field
			v-if="account.subtype != 'currency' && account.subtype"
			v-model="account.institution"
			:items="accountInstitutions"
			field-type="select"
			form-label="Instituição"
			item-text="name"
			item-value="id"
			hide-details
			label="Banco ou corretora"
		/>
    <base-form-field
      field-type="text-field"
      v-if="account.institution && account.institution.name && account.institution.name.startsWith('Outro')"
      form-label="Outra Instituição"
      flat
      solo
      hide-details
      label="Banco ou corretora"
      v-model="account.unregisteredInstitution"
    />
    <base-form-field
      field-type="text-field"
      form-label="Saldo inicial"
      flat
      solo
      hide-details
      prefix="R$ "
      label="0,00"
      v-model="startingBalance"
    />
    <v-divider class="my-4" />
    <v-btn block color="primary" :disabled="loading" :loading="loading" large @click="submitAccount">salvar</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, PropSync, Vue } from "vue-property-decorator";
import { Account, User } from "@/models";
import { AccountSubtypes } from "@/models/enums";
import auth from "@/store/modules/auth";
import finances from "@/store/modules/finances";

import BaseTextField from "@/components/base/TextField.vue";
import BaseSelect from "@/components/base/Select.vue";
import BaseFormField from "@/components/base/FormField.vue";

@Component({
  components: {
    BaseTextField,
    BaseSelect,
    BaseFormField,
  },
})
export default class AccountForm extends Vue {
  @PropSync("data", { required: true, type: Object })
  account!: Account;

  loading = false;
  accountTypes = [
    { text: "Carteira", value: AccountSubtypes.CURRENCY },
    { text: "Carteira Digital", value: AccountSubtypes.DIGITAL_CURRENCY },
    { text: "Conta Corrente", value: AccountSubtypes.CURRENT },
    { text: "Conta em Corretora", value: AccountSubtypes.BROKER },
  ];

  get accountInstitutions() {
    switch (this.account.subtype) {
      case AccountSubtypes.CURRENT:
        return finances.bankInstitutions;
      case AccountSubtypes.BROKER:
        return finances.brokerInstitutions;
      case AccountSubtypes.DIGITAL_CURRENCY:
        return finances.paymentInstitutions;
      default:
        return [];
    }
  }

  get startingBalance(): string {
    const startingBalance = this.account.startingBalance || 0;
    if (startingBalance - Math.ceil(startingBalance) !== 0) {
      return startingBalance.toFixed(2).replace(".", ",");
    }
    return startingBalance.toString();
  }
  set startingBalance(str: string) {
    str.replace(/\D/g, "");
    if (str == "") str = "0";
    this.account.startingBalance = parseFloat(str.replace(",", "."));
  }

  @Emit("submit")
  submitAccount() {}
}
</script>
