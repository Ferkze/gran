<template>
  <v-list-item>
		<v-list-item-icon>
			<v-icon>{{ getCategoryIcon(budget.category) }}</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title>
				<span>{{ getCategoryName(budget.category) }}</span>
				<span class="float-right">
					<span class="font-weight-light">R$ {{ budget.current | formatCash }} de</span>
					<span class="font-weight-bold"> R$ {{ budget.value | formatCash }}</span></span>
			</v-list-item-title>
			<v-list-item-subtitle class="mt-2">
				<v-progress-linear :color="progressColor(budget.current/budget.value)" :value="100*(budget.current/budget.value)" height="8" background-color="grey lighten-2"/>
			</v-list-item-subtitle>
		</v-list-item-content>
	</v-list-item>
</template>

<script lang="ts">
import { Budget } from "@/models";
import finances from '@/store/modules/finances';
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class IncomeListItem extends Vue {
  @Prop({ required: true, type: Object })
  budget!: Budget;

  progressColor(percent: number) {
    if (percent > 0.6) {
      return 'success'
    } else if (percent > 0.3) {
      return 'warning'
    } else {
      return 'error'
    }
  }

	getCategoryIcon(categoryId: string) {
		const category = finances.categories.find(c => c.id == categoryId)
		if (category) return 'mdi-'+category.icon
		else return 'mdi-triangle'
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