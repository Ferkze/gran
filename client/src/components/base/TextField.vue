<template>
	<v-text-field :background-color="bgColor" flat solo v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	name: 'BaseTextField'
})
export default class BaseTextField extends Vue {
	get bgColor() {
		if (this.$vuetify.theme.dark) {
			return 'grey darken-2'
		}
		return 'grey lighten-3'
	}
}
</script>
