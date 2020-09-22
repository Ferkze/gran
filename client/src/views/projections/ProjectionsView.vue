<template>
	<v-container class="">
		<h1 class="display-1">{{ $route.name }}</h1>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	name: 'BudgetsView'
})
export default class Budgets extends Vue {}
</script>
