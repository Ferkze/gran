<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'BillsView'
})
export default class Bills extends Vue {}
</script>
