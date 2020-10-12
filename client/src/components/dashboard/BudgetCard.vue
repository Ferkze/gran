<template>
  <v-card>
    <v-card-title>Orçamento de gastos do mês</v-card-title>
    <v-card-text>
      <v-list two-line v-if="!loading">
        <v-list-item v-for="budget in budgets" :key="budget.id">
          <v-list-item-icon>
            <v-icon>{{ budget.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>{{ budget.category }}</span>
              <span class="float-right">
                <span class="font-weight-light">R$ {{ budget.current | formatCash }} de</span>
                <span class="font-weight-bold"> R$ {{ budget.value | formatCash }}</span></span>
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">
              <v-progress-linear :color="progressColor(budget.current/budget.value)" :value="100*(budget.current/budget.value)" height="8" background-color="grey lighten-2"/>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-skeleton-loader v-else type="list-item@4" />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text>
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

@Component
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
    await planningModule.fetchPlannings({})
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

<style scoped>
</style>