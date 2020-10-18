<template>
	<v-row v-if="!loading">
		<v-col cols="12">
			<v-fade-transition group hide-on-leave mode="out-in">
			<group-transaction-list-item v-for="item in transactions" :key="item.id" :transaction="item" />
			</v-fade-transition>
		</v-col>
	</v-row>
	<v-row v-else>
		<v-col>
			<v-fade-transition group hide-on-leave mode="out-in">
			<v-skeleton-loader v-for="n in 3" :key="n" class="mb-3" type="image" height="80" />
			</v-fade-transition>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Transaction } from '@/models';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	components: {
		GroupTransactionListItem: () => import('@/components/group/GroupTransactionListItem.vue')
	}
})
export default class GroupTransactionsList extends Vue {
	@Prop({ type: Array, required: true })
	transactions!: Transaction[]

	@Prop({ type: Boolean, required: true })
	loading!: boolean
	
}
</script>

<style scoped>

</style>