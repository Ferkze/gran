<template>
  <v-dialog v-model="show" width="520">
    <v-card>
      <v-card-title>Adicionar fonte de renda</v-card-title>
      <v-card-text>
        <income-budget-form :data.sync="income" @submit="addIncome" :loading="loading" />
        <planning-budget-list :budgets="incomes" summary-text="Renda total esperada" />
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
import planningModule from "@/store/modules/planningModule";
import status from "@/store/modules/status";
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  components: {
    IncomeBudgetForm: () =>
      import("@/components/planning/IncomeBudgetForm.vue"),
    PlanningBudgetList: () =>
      import("@/components/planning/PlanningBudgetList.vue"),
  },
})
export default class IncomesDialog extends Vue {
  @PropSync("dialog", { type: Boolean, default: true })
  show!: boolean;

  @Prop({ required: true, type: String })
  planningId!: Planning["id"];

  loading = false;

	incomes: Budget[] = []
	expenses: Budget[] = []
  income: Budget = {
    type: CategoryType.INCOME,
    category: "",
    icon: "",
    current: 0,
    value: 0,
  };
  addIncome() {
    const income = Object.assign({}, this.income);
    this.incomes.push(income);
    this.income.category = "";
    this.income.value = 0;
  }

	async save() {
		this.loading = true;
    try {
      await planningModule.updatePlanningBudgets({
				planningId: this.planningId,
				budgets: [...this.incomes, ...this.expenses]
			});
      status.setStatus({
        type: "success",
        message: "Fontes de renda atualizadas com sucesso",
      });
    } catch (error) {
      status.setStatus({
        type: "error",
        message: `Não foi possível atualizar as fontes de renda: ${error.toString()}`,
      });
      status.setError(error);
    } finally {
      this.loading = false;
    }
	}
	
	mounted() {
    const planning = planningModule.plannings.find(
      (p) => p.id == this.planningId
    );
    if (planning) {
			this.incomes.push(...planning.budgets.filter((b) => b.type == CategoryType.INCOME));
			this.expenses.push(...planning.budgets.filter((b) => b.type == CategoryType.EXPENSE));
		}
	}

}
</script>
