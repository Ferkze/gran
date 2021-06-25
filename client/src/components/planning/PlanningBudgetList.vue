<template>
	<v-list two-line>
		<v-list-item v-for="budget in budgets" :key="budget.id" >
			<v-list-item-content>
				<v-list-item-title>
					<span>{{ getCategoryName(budget.category) }}</span>
					<span class="float-right">
						<span class="font-weight-bold"> R$ {{ budget.value | formatCash }}</span></span>
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item class="grey lighten-3">
			<v-list-item-content>
				<v-list-item-title>
					<span class="font-weight-bold">{{ summaryText }}</span>
					<span class="float-right">
						<span class="font-weight-bold"> R$ {{ total | formatCash }}</span></span>
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { Budget } from '@/models';
import { CategoryType } from '@/models/enums';
import finances from '@/store/modules/finances';
import { Component, Prop, Vue } from 'vue-property-decorator';

	@Component
export default class IncomesPlanningList extends Vue {
		@Prop({ type: Array, required: true })
		budgets!: Budget[]

		@Prop()
		summaryText!: string

		get total() {
			return this.budgets.reduce((acc, cur) => acc + cur.value, 0)
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