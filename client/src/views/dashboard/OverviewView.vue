<template>
	<v-container>
		<section>
			<v-row>
				<v-col cols="12" sm="6">
					<balance-card></balance-card>
					<accounts-card class="mt-6"></accounts-card>
				</v-col>
				<v-col cols="12" sm="6">
					<budget-card></budget-card>
				</v-col>
			</v-row>
		</section>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	components: {
		AccountsCard: () => import('@/components/dashboard/AccountsCard.vue'),
		BalanceCard: () => import('@/components/dashboard/BalanceCard.vue'),
		BudgetCard: () => import('@/components/dashboard/BudgetCard.vue')
	}
})
export default class OverviewView extends Vue {
	
}
</script>
