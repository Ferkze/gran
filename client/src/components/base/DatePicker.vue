<template>
	<v-menu
		ref="menu"
		v-model="menu"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		min-width="290px"
	>
		<template v-slot:activator="{ on }">
			<base-text-field :value="date" v-bind="$attrs" prepend-inner-icon="mdi-calendar" readonly v-on="on" />
		</template>
		<v-date-picker :value="date" v-bind="$attrs" no-title scrollable @input="menu = false" @change="$emit('input', $event)" />
	</v-menu>
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'

import BaseTextField from './TextField.vue'

@Component({
	components: {
		BaseTextField
	},
	name: 'BaseDatePicker',
	inheritAttrs: false
})
export default class BaseDatePicker extends Vue {
	@Model('input', { type: String, default: new Date().toISOString().substr(0, 10) })
	date!: string

	menu = false

	get bgColor() {
		if (this.$vuetify.theme.dark) {
			return 'grey darken-2'
		}
		return 'grey lighten-3'
	}
}
</script>
