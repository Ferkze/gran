<template>
  <v-card>
    <v-card-title>Orçamento de gastos do mês</v-card-title>
    <v-card-text>
      <v-list two-line>
        <v-list-item v-for="budget in budgets" :key="budget.id">
          <v-list-item-icon>
            <v-icon>{{ budget.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span>{{ budget.category }}</span>
              <span class="float-right">
                <span class="font-weight-light">R$ {{ budget.current | formatCash }} de</span>
                <span class="font-weight-bold"> R$ {{ budget.max | formatCash }}</span></span>
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">
              <v-progress-linear :color="progressColor(budget.current/budget.max)" :value="100*(budget.current/budget.max)" height="8" background-color="grey lighten-2"/>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BudgetCard extends Vue {
  budgets = [
    { id: 0, icon: 'mdi-ticket', category: 'Lazer', current: 100, max: 300 },
    { id: 1, icon: 'mdi-train-car', category: 'Transporte', current: 100, max: 250 },
    { id: 2, icon: 'mdi-heart-pulse', category: 'Saúde', current: 150, max: 250 },
    { id: 3, icon: 'mdi-cart', category: 'Mercado', current: 450, max: 500 },
    { id: 4, icon: 'mdi-cellphone-wireless', category: 'Telefonia e Internet', current: 120, max: 120 }
  ]

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