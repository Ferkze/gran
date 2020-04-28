<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'OverviewView'
})
export default class Overview extends Vue {}
</script>
