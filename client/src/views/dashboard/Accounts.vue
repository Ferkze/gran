<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AccountsView'
})
export default class Accounts extends Vue {}
</script>
