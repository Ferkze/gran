<template>
	<v-snackbar v-if="message" v-model="show" bottom :timeout="6000">
		<span>{{ message }}</span>
		<v-btn :color="type" icon @click="show = false">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import status from '../store/modules/status'

@Component({
	inject: ['theme']
})
export default class AppSnackbar extends Vue {
	show = false

	get message() {
		return status.message
	}

	get type() {
		return status.type
	}

	@Watch('message', { deep: true, immediate: true })
	onStatusChanged(message: string) {
		if (message) {
			this.show = true
			return
		}
		this.show = false
	}
}
</script>
