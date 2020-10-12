<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Criar planejamento</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
								<v-stepper v-model="stepper">
									<v-stepper-header>
										<v-stepper-step :complete="stepper > 1" step="1">Período planejado</v-stepper-step>
										<v-divider/>
										<v-stepper-step :complete="stepper > 2" step="2">Fontes de renda</v-stepper-step>
										<v-divider/>
										<v-stepper-step step="3">Orçamento de gastos</v-stepper-step>
									</v-stepper-header>

									<v-stepper-items>
										<v-stepper-content step="1">
											<planning-form :data.sync="planning" :loading="loading" @submit="createPlanning" submit-text="Prosseguir" />
										</v-stepper-content>

										<v-stepper-content step="2">
											<income-budget-form :data.sync="income" @submit="addIncome" :loading="loading" />
											<planning-budget-list :budgets="incomes" summary-text="Renda total esperada" />
											<div class="mt-2">
												<v-btn color="primary" :disabled="loading" :loading="loading" @click="stepper++">Prosseguir</v-btn>
												<v-btn class="ml-4" :disabled="loading" text @click="stepper--">Voltar</v-btn>
											</div>
										</v-stepper-content>

										<v-stepper-content step="3">
											<expense-budget-form :data.sync="expense" @submit="addExpense" :loading="loading" />
											<planning-budget-list :budgets="expenses" summary-text="Total de gastos orçado" />
											<div class="mt-2">
												<v-btn color="primary" :disabled="loading" :loading="loading" @click="finishPlanning">Finalizar planejamento</v-btn>
												<v-btn class="ml-4" :disabled="loading" text @click="stepper--">Voltar</v-btn>
											</div>
										</v-stepper-content>
									</v-stepper-items>
								</v-stepper>
              </v-col>
            </v-row>  
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Budget, Planning } from '@/models';
import { CategoryType } from '@/models/enums';
import finances from '@/store/modules/finances';
import planningModule from '@/store/modules/planningModule';
import status from '@/store/modules/status';
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    PlanningForm: () =>
      import("@/components/planning/PlanningForm.vue"),
    ExpenseBudgetForm: () =>
			import("@/components/planning/ExpenseBudgetForm.vue"),
		ExpenseListItem: () => import('@/components/planning/ExpenseListItem.vue'),
    IncomeBudgetForm: () =>
      import("@/components/planning/IncomeBudgetForm.vue"),
		PlanningBudgetList: () => import('@/components/planning/PlanningBudgetList.vue'),
	},
	beforeRouteLeave (to, from , next) {
		const answer = window.confirm('Você tem alterações que não foram salvas, deseja realmente sair?')
		if (answer) {
			next()
		} else {
			next(false)
		}
	}
})
export default class CreatePlanningView extends Vue {

	planning: Planning = {
		month: new Date().getMonth()+1,
		year: new Date().getFullYear(),
		budgets: [
			{ id: '123', current: 0, value: 2500, type: CategoryType.INCOME, category: '5f6bd332fb5bce16e339d783' },
		]
	}
	income: Budget = {
		type: CategoryType.INCOME,
		category: '',
		icon: '',
		current: 0,
		value: 0
	}
	expense: Budget = {
		type: CategoryType.EXPENSE,
		category: '',
		icon: '',
		current: 0,
		value: 0
	}
	loading = false

	stepper = 1

	mounted() {
		if (this.$route.query.mes && this.$route.query.ano) {
			this.planning.year = parseInt(this.$route.query.ano as string)
			this.planning.month = parseInt(this.$route.query.mes as string)
		}
	}

	createPlanning() {
		this.stepper++
	}
	addIncome() {
		const income = Object.assign({}, this.income)
		this.planning.budgets.push(income)
		this.income.category = ''
		this.income.value = 0
	}
	addExpense() {
		const expense = Object.assign({}, this.expense)
		this.planning.budgets.push(expense)
		this.expense.category = ''
		this.expense.value = 0
	}
	async finishPlanning() {
		this.loading = true;
    try {
      await planningModule.createPlanning(this.planning);
      status.setStatus({
        type: "success",
        message: "Planejamento criado com sucesso",
      });
      this.$router.push(`/planejamento?mes=${this.planning.month}&ano=${this.planning.year}`);
    } catch (error) {
      status.setStatus({
        type: "error",
        message: `Não foi possível criar o planejamento: ${error.toString()}`,
      });
      status.setError(error);
    } finally {
      this.loading = false;
    }
	}

	get incomes() {
		return this.planning.budgets.filter(b => b.type == CategoryType.INCOME)
	}

	get expenses() {
		return this.planning.budgets.filter(b => b.type == CategoryType.EXPENSE)
	}
	
	get totalIncome() {
		return this.incomes.reduce((acc, cur) => acc + cur.value, 0)
	}
	
	get totalExpense() {
		return this.expenses.reduce((acc, cur) => acc + cur.value, 0)
	}

	getCategoryName(categoryId: string) {
		const category = finances.categories.find(c => c.id == categoryId)
		if (category) return category.name
		else return ''
	}
}
</script>

<style scoped>
</style>