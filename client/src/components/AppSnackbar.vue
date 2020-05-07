<template>
  <v-snackbar bottom v-model="show" v-if="status" :timeout="7000">
    <span>{{ status.message }}</span>
    <v-btn icon :color="status.type" @click="show = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import status from '../store/modules/status'
import { AppStatus } from '../models'

@Component({
  inject: ['theme']
})
export default class AppSnackbar extends Vue {
  show = false

  get status() {
    return {
      message: status.message,
      type: status.type
    }
  }

  @Watch('status', { deep: true, immediate: true })
  onStatusChanged(val?: AppStatus) {
    console.log('val status', val)
    if (val?.message) {
      this.show = true
      return
    }
    this.show = false
  }
}
</script>
