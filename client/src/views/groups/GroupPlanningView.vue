<template>
  <v-container class>
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
          <v-row no-gutters align="center">
            <v-col>
              <v-card-title>
                <h2 class="title font-weight-medium">Planejamento financeiro do grupo</h2>
              </v-card-title>
            </v-col>
            <v-col class="text-right px-4" v-if="!currentPlanning">
              <v-btn class="primary px-6" depressed small @click="planningDialog = true">
                <span class="text-lowercase">criar planejamento</span>
              </v-btn>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-btn icon class="px-5" @click="prevMonth">
              <v-icon size="20">mdi-chevron-left</v-icon>
            </v-btn>
            <span class="font-weight-light text-body-1 grey--text text--darken-3">{{ month | monthName }} de {{ year }}</span>
            <v-btn icon class="px-5" @click="nextMonth">
              <v-icon size="20">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
          <budget-progress-bar v-if="currentPlanning" :data="budgetProgress" />
          <v-card-text v-if="currentPlanning">
            <v-row>
              <v-col>
                <div class="font-weight-medium grey--text text--darken-4 px-3">Fontes de renda</div>
              </v-col>
              <v-col class="text-right px-4">
                <v-btn class="primary" depressed small @click="incomesDialog = true">
                  <span class="text-lowercase">nova fonte de renda</span>
                </v-btn>
              </v-col>
            </v-row>
						<group-planning-incomes-dialog :dialog.sync="incomesDialog" :planning-id="currentPlanning.id" :groupId="groupId" />
            <v-list two-line>
              <income-list-item v-for="budget in incomes" :key="budget.id" :budget="budget" />
            </v-list>
            <v-row>
              <v-col>
                <div class="font-weight-medium grey--text text--darken-4 px-3">Orçamento de gastos</div>
              </v-col>
              <v-col class="text-right px-4">
                <v-btn class="primary" depressed small @click="expensesDialog = true">
                  <span class="text-lowercase">novo orçamento</span>
                </v-btn>
              </v-col>
            </v-row>
						<group-planning-expenses-dialog :dialog.sync="expensesDialog" :planning-id="currentPlanning.id" :groupId="groupId" />
            <v-list two-line>
              <expense-list-item v-for="budget in expenses" :key="budget.id" :budget="budget" />
            </v-list>
          </v-card-text>
          <v-card-text v-else>
            <p class="text-center">Nenhum planejamento para o mês foi criado</p>
            <p class="text-center">Comece pelo botão acima</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <group-planning-dialog :dialog.sync="planningDialog" :group-id="$route.params.groupId" />
  </v-container>
</template>

<script lang="ts">
import { BudgetProgress } from "@/models";
import { Component, Vue } from "vue-property-decorator";
import planningModule from "@/store/modules/planningModule";
import groupsModule from "@/store/modules/groupsModule";

@Component({
	components: {
		BudgetProgressBar: () => import("@/components/planning/BudgetsProgressBar.vue"),
		IncomeListItem: () => import("@/components/planning/IncomeListItem.vue"),
		ExpenseListItem: () => import("@/components/planning/ExpenseListItem.vue"),
		GroupPlanningDialog: () => import("@/components/group/GroupPlanningDialog.vue"),
		GroupPlanningIncomesDialog: () => import('@/components/group/GroupPlanningIncomesDialog.vue'),
		GroupPlanningExpensesDialog: () => import('@/components/group/GroupPlanningExpensesDialog.vue'),
	},
})
export default class GroupPlanningView extends Vue {
  planningDialog = false
  incomesDialog = false
  expensesDialog = false
  
  year = 2020;
  month = 10;

  nextMonth() {
  	if (this.month == 12) {
  		this.month = 1;
  		this.year++;
  	} else {
  		this.month++;
  	}
  }

  prevMonth() {
  	if (this.month == 1) {
  		this.month = 12;
  		this.year--;
  	} else {
  		this.month--;
  	}
  }

  get groupId() {
  	return this.$route.params.groupId
  }

  get currentPlanning() {
  	return groupsModule.selectedGroupPlannings.find((planning) => {
  		return planning.year == this.year && planning.month == this.month;
  	});
  }

  get incomes() {
  	if (this.currentPlanning) {
  		return this.currentPlanning.budgets.filter(
  			(budget) => budget.type == "income"
  		);
  	}
  	return [];
  }

  get expenses() {
  	if (this.currentPlanning) {
  		return this.currentPlanning.budgets.filter(
  			(budget) => budget.type == "expense"
  		);
  	}
  	return [];
  }

  get budgetProgress(): BudgetProgress {
  	return {
  		incomesProgress: parseInt(this.incomesProgress.toFixed(0)),
  		incomesTotal: this.incomesTotal,
  		expensesProgress: parseInt(this.expensesProgress.toFixed(0)),
  		expensesTotal: this.expensesTotal,
  	};
  }

  get incomesProgress() {
  	const incomeCurrentTotal = this.incomes.reduce(
  		(acc, cur) => {
  			acc[0] += cur.current;
  			acc[1] += cur.value;
  			return acc;
  		},
  		[0, 0]
  	);
  	return (incomeCurrentTotal[0] * 100) / incomeCurrentTotal[1];
  }

  get incomesTotal() {
  	return this.incomes.reduce((acc, cur) => acc + cur.current, 0);
  }

  get expensesProgress() {
  	const expenseCurrentTotal = this.expenses.reduce(
  		(acc, cur) => {
  			acc[0] += cur.current;
  			acc[1] += cur.value;
  			return acc;
  		},
  		[0, 0]
  	);
  	return (expenseCurrentTotal[0] * 100) / expenseCurrentTotal[1];
  }

  get expensesTotal() {
  	return this.expenses.reduce((acc, cur) => acc + cur.current, 0);
  }
}
</script>
