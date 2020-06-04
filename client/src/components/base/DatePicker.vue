<template>
	<v-menu
		ref="menu"
		v-model="menu"
		:close-on-content-click="false"
		:return-value.sync="date"
		transition="scale-transition"
		offset-y
		min-width="290px"
	>
		<template v-slot:activator="{ on }">
			<base-text-field :value="date" v-bind="$attrs" prepend-inner-icon="mdi-calendar" readonly v-on="on" />
		</template>
		<v-date-picker :value="date" v-bind="$attrs" no-title scrollable @change="$emit('input', $event)">
			<v-spacer />
			<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
			<v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
		</v-date-picker>
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
	@Model('input', { type: String, default: new Date().toISOString().substr(0, 10) }) readonly date!: string
	menu = false

	get bgColor() {
		if (this.$vuetify.theme.dark) {
			return 'grey darken-2'
		}
		return 'grey lighten-3'
	}
}
</script>
