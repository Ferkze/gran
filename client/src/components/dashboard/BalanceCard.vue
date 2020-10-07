<template>
  <v-card v-if="!loading" class="light-blue lighten-1 white--text text-center" height="200">
    <v-row align="center" align-content="center" class="fill-height" justify="center">
      <v-col cols="12">
        <span class="text-h5 font-weight-bold">Seu saldo atual é de</span>
      </v-col>
      <v-col cols="12" v-if="balance">
        <span class="text-h3 font-weight-bold">R$ {{ balance.balance | formatCurrency}}</span>
      </v-col>
    </v-row>
  </v-card>
	<v-skeleton-loader v-else type="image" height="200" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BalanceService, { Balance } from '@/service/api/BalanceService'

@Component
export default class BalanceCard extends Vue {
	balance: Balance | null = null
	loading = false

	async mounted() {
		this.loading = true
		this.balance = await BalanceService.getBalance()
		this.loading = false
	}
}
</script>

<style scoped>
</style>