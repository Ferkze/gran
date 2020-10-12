<template>
	<v-currency-field background-color="grey lighten-3" flat solo v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BaseCurrencyField extends Vue { }
</script>
