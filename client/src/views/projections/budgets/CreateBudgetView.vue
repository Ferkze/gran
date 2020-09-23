<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="6">
				<v-card>
					<v-card-title>Novo orçamento</v-card-title>
					<v-card-text>
						<budget-form></budget-form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		components: {
			BudgetForm: () => import('@/components/projections/budgets/BudgetForm.vue')
		}
	})
	export default class CreateBudgetView extends Vue {
		
	}
</script>

<style scoped>

</style>