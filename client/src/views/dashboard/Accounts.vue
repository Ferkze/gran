<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
    <v-divider />
    <v-row>
      <v-col v-for="acc in accounts" :key="acc._id">
        <v-card>
          <v-card-title>
            {{ acc.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import finances from '../../store/modules/finances'

@Component({
  name: 'AccountsView'
})
export default class Accounts extends Vue {
  mounted() {
    finances.fetchAccounts()
  }

  get accounts() {
    return finances.accounts
  }
}
</script>
