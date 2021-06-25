<template>
  <v-dialog v-model="show" width="520">
    <v-card>
      <v-card-title>Adicionar orçamento de gastos</v-card-title>
      <v-card-text>
        <expense-budget-form :data.sync="expense" @submit="addExpense" :loading="loading" />
				<planning-budget-list :budgets="expenses" summary-text="Total de gastos orçado" />
        <div class="mt-2">
          <v-btn color="primary" :disabled="loading" :loading="loading" @click="save">Salvar</v-btn>
          <v-btn class="ml-4" :disabled="loading" text @click="show = false">Cancelar</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Budget, Planning, User } from "@/models";
import { CategoryType } from "@/models/enums";
import GroupsService from "@/service/api/GroupsService";
import groupsModule from "@/store/modules/groupsModule";
import status from "@/store/modules/status";
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
	components: {
		ExpenseBudgetForm: () =>
      import("@/components/planning/ExpenseBudgetForm.vue"),
		PlanningBudgetList: () =>
      import("@/components/planning/PlanningBudgetList.vue"),
	},
})
export default class GroupPlanningExpensesDialog extends Vue {
  @PropSync("dialog", { type: Boolean, default: true })
  show!: boolean;

  @Prop({ required: true, type: String })
  planningId!: Planning["id"];

  loading = false;

	incomes: Budget[] = []
	expenses: Budget[] = []
  expense: Budget = {
  	type: CategoryType.EXPENSE,
  	category: "",
  	current: 0,
  	value: 0,
  };
  addExpense() {
  	const expense = Object.assign({}, this.expense);
  	this.expenses.push(expense);
  	this.expense.category = "";
  	this.expense.value = 0;
  }

  async save() {
  	this.loading = true;
  	try {
  		await groupsModule.updateGroupPlanningBudgets({
  			planningId: this.planningId,
  			budgets: [...this.incomes, ...this.expenses]
  		});
  		status.setStatus({
  			type: "success",
  			message: "Orçamentos de gastos atualizadas com sucesso",
  		});
  	} catch (error) {
  		status.setStatus({
  			type: "error",
  			message: `Não foi possível atualizar os orçamentos de gastos: ${error.toString()}`,
  		});
  		status.setError(error);
  	} finally {
  		this.loading = false;
  	}
  }
	
  mounted() {
  	const planning = groupsModule.selectedGroupPlannings.find(
  		(p) => p.id == this.planningId
  	);
  	if (planning) {
  		this.incomes.push(...planning.budgets.filter((b) => b.type == CategoryType.INCOME));
  		this.expenses.push(...planning.budgets.filter((b) => b.type == CategoryType.EXPENSE));
  	}
  }

}
</script>
