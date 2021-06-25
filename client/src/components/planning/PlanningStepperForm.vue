<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <v-stepper-step :complete="stepper > 1" step="1">Período planejado</v-stepper-step>
      <v-divider />
      <v-stepper-step :complete="stepper > 2" step="2">Fontes de renda</v-stepper-step>
      <v-divider />
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
          <v-btn color="primary" :disabled="loading" :loading="loading" @click="submit">Finalizar planejamento</v-btn>
          <v-btn class="ml-4" :disabled="loading" text @click="stepper--">Voltar</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Budget, Planning } from "@/models";
import { CategoryType } from "@/models/enums";
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
	components: {
		PlanningForm: () => import('@/components/planning/PlanningForm.vue'),
		IncomeBudgetForm: () => import('@/components/planning/IncomeBudgetForm.vue'),
		PlanningBudgetList: () => import('@/components/planning/PlanningBudgetList.vue'),
		ExpenseBudgetForm: () => import('@/components/planning/ExpenseBudgetForm.vue')
	},
})
export default class PlanningStepperForm extends Vue {
	@PropSync('data', { type: Object, required: true })
	planning!: Planning

	@Prop({ type: Boolean, default: false })
	loading!: boolean

  income: Budget = {
  	type: CategoryType.INCOME,
  	category: "",
  	icon: "",
  	current: 0,
  	value: 0,
  };
  expense: Budget = {
  	type: CategoryType.EXPENSE,
  	category: "",
  	icon: "",
  	current: 0,
  	value: 0,
  };

  stepper = 1;

  mounted() {
  	if (this.$route.query.mes && this.$route.query.ano) {
  		this.planning.year = parseInt(this.$route.query.ano as string);
  		this.planning.month = parseInt(this.$route.query.mes as string);
  	}
  }
  createPlanning() {
  	this.stepper++;
  }
  addIncome() {
  	const income = Object.assign({}, this.income);
  	this.planning.budgets.push(income);
  	this.income.category = "";
  	this.income.value = 0;
  }
  addExpense() {
  	const expense = Object.assign({}, this.expense);
  	this.planning.budgets.push(expense);
  	this.expense.category = "";
  	this.expense.value = 0;
  }
	
	@Emit('submit')
  submit() {}

	get incomes() {
		return this.planning.budgets.filter((b) => b.type == CategoryType.INCOME);
	}

	get expenses() {
		return this.planning.budgets.filter((b) => b.type == CategoryType.EXPENSE);
	}
}
</script>
