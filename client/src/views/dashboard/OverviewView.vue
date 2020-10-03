<template>
	<v-container class="">
		<h1 class="display-1">{{ $route.name }}</h1>
		<section v-if="!loading && balance">
			<v-row>
				<v-col cols="12" sm="6" md="4" lg="3">
					<v-card>
						<v-card-title>
							Saldo
						</v-card-title>
						<v-card-text>
							R$ {{ balance.balance | formatCurrency }}
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<v-card>
						<v-card-title>
							Receitas
						</v-card-title>
						<v-card-text>
							R$ {{ balance.debits | formatCurrency }}
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<v-card>
						<v-card-title>
							Gastos
						</v-card-title>
						<v-card-text>
							R$ {{ balance.credits | formatCurrency }}
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</section>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BalanceService, { Balance } from '@/service/api/BalanceService'

@Component({
	name: 'OverviewView'
})
export default class OverviewView extends Vue {
	balance: Balance | null = null
	loading = false

	async mounted() {
		this.loading = true
		this.balance = await BalanceService.getBalance()
		this.loading = false
	}
	
}
</script>
