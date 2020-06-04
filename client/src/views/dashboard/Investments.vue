<template>
	<v-container class="">
		<h1 class="display-1">{{ $route.name }}</h1>
		<v-divider class="my-3" />
		<section>
			<v-row>
				<v-col cols="12"> Total investido: R$ {{ totalInvested | formatCurrency }} </v-col>
			</v-row>
		</section>
		<section>
			<v-row>
				<v-col v-for="investment in investmentTypes" :key="investment.name" cols="12" sm="6" md="4">
					<v-card>
						<v-card-title :class="`white--text ${investment.color}`">
							<v-row>
								<v-col cols="8">{{ investment.name }}</v-col>
								<v-col cols="4" class="text-right">
									<div>{{ ((investment.total / totalInvested) * 100).toFixed(2) }} %</div>
								</v-col>
							</v-row>
						</v-card-title>
						<v-card-text class="">
							<v-row>
								<v-col cols="6">Valor total investido:</v-col>
								<v-col cols="6" class="text-right">
									<b>R$ {{ investment.total | formatCurrency }}</b>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="6">Resultado no mês:</v-col>
								<v-col cols="6" class="text-right">
									<b>R$ {{ investment.monthResult | formatCurrency }}</b>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="6">Número de Ativos:</v-col>
								<v-col cols="6" class="text-right">
									<b>{{ investment.totalAssets }}</b>
								</v-col>
							</v-row>
						</v-card-text>
						<v-divider />
						<v-card-actions>
							<v-btn block text>
								<v-icon left>mdi-arrow-right</v-icon>
								<span class="text-capitalize body-2">Acessar ativos</span>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</section>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	name: 'InvestmentsView'
})
export default class Investments extends Vue {
	investmentTypes = [
		{ name: 'Renda Variável', total: 25709.9, color: 'red', totalAssets: 16, monthResult: 394.86 },
		{ name: 'Renda Fixa', total: 4980.87, color: 'blue', totalAssets: 2, monthResult: 10.37 }
	]

	get totalInvested() {
		return this.investmentTypes.reduce((a, c) => a + c.total, 0)
	}
}
</script>
