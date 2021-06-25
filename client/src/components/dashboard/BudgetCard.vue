<template>
  <v-card>
    <v-card-title>Orçamento de gastos do mês</v-card-title>
    <v-card-text>
      <v-list two-line v-if="!loading && budgets.length > 0">
        <expense-list-item v-for="budget in budgets" :key="budget.id" :budget="budget" />
      </v-list>
      <v-skeleton-loader v-else-if="loading" type="list-item@4" />
      <div v-else>
        <p>Começe a planejar seus gastos para acompanhar seu dinheiro</p>
        <p>Clique no link abaixo para começar</p>
      </div>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn text to="/planejamento">
        <span class="text-capitalize">Mais detalhes</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Budget } from '@/models';
import { CategoryType } from '@/models/enums';
import planningModule from '@/store/modules/planningModule';
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {
		ExpenseListItem: () => import('@/components/planning/ExpenseListItem.vue')
	}
})
export default class BudgetCard extends Vue {
  loading = false
  
  get budgets () {
  	const today = new Date()
  	const planning = planningModule.plannings.find(p => p.month == today.getMonth()+1 && p.year == today.getFullYear())
  	if (!planning) {
  		return []
  	}
  	return planning.budgets.filter(b => b.type == CategoryType.EXPENSE)
  }

  mounted() {
  	this.fetchData()
  }

  async fetchData() {
  	this.loading = true
  	const plannings = await planningModule.fetchPlannings({})
  	this.loading = false
  }

  progressColor(percent: number) {
  	if (percent > 0.7) {
  		return 'red'
  	} else if (percent > 0.4) {
  		return 'warning'
  	} else {
  		return 'success'
  	}
  }
}
</script>
