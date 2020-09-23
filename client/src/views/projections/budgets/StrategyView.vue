<template>
	<v-container>
		<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Orçamento de Gastos</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Estratégia de Investimentos</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Visão Geral</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
				<v-card>
					<v-card-title>Orçamento de gastos</v-card-title>
					<v-card-text>
						<p>Em uma estratégia {{ $route.query.abordagem }}, você destina 25% de sua renda para gastos</p>
						<p>Agora selecionaremos os gastos que serão essenciais ou </p>
					</v-card-text>
				</v-card>
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continuar
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
				<v-card>
					<v-card-title>Estratégia de Investimentos</v-card-title>
					<v-card-text>
						<!-- <budget-form></budget-form> -->
					</v-card-text>
				</v-card>
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continuar
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continuar
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
		<v-row justify="center">
			<v-col cols="6">
			</v-col>
			<v-col cols="6">
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		components: {
			BudgetForm: () => import('@/components/projections/budgets/BudgetForm.vue')
		}
	})
	export default class StrategyView extends Vue {
		e1 = 1
	}
</script>

<style scoped>

</style>