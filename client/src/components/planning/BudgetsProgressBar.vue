<template>
	<v-row class="px-8" align="center" justify="center">
		<v-col class="text-center px-8">
			<v-row>
				<v-col cols="4" class="text-right">
					<v-progress-circular color="success" :value="data.incomesProgress" size="52" />
				</v-col>
				<v-col cols="8" class="pl-0">
					<div class="font-weight-bold">Fonte de renda</div>
					<div class="font-weight-light">{{ data.incomesProgress }}%</div>
				</v-col>
			</v-row>
		</v-col>
		<v-col class="text-center px-8">
			<v-row>
				<v-col cols="4" class="text-right">
					<v-progress-circular color="error" :value="data.expensesProgress" size="52" />
				</v-col>
				<v-col cols="8" class="pl-0">
					<div class="font-weight-bold">Despesas</div>
					<div class="font-weight-light">{{ data.expensesProgress }}%</div>
				</v-col>
			</v-row>
		</v-col>
		<v-col class="text-center px-8">
			<v-row>
				<v-col cols="4" class="text-right">
					<v-progress-circular color="error" width="26" value="100" size="52" />
				</v-col>
				<v-col cols="8" class="pl-0">
					<div class="font-weight-bold">Despesas totais</div>
					<div class="font-weight-light">R$ {{ data.expensesTotal }}</div>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { BudgetProgress } from '@/models';
import { Component, Prop, Vue } from 'vue-property-decorator';

	@Component
export default class BudgetsProgressBar extends Vue {
		@Prop({ type: Object, required: true })
		data!: BudgetProgress

}
</script>
