<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item v-for="item in items" :key="item.name" :to="item.route">
        <v-list-item-icon>
          <v-icon color="" v-html="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          {{ item.name }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class WebRail extends Vue {
  items = [
    { name: 'Overview', route: '/dashboard', icon: 'mdi-view-dashboard' },
    { name: 'Accounts', route: '/dashboard/accounts', icon: 'mdi-currency-usd' },
    { name: 'Bills', route: '/dashboard/bills', icon: 'mdi-currency-usd-off' },
    { name: 'Budgets', route: '/dashboard/budgets', icon: 'mdi-poll' },
    { name: 'Investments', route: '/dashboard/investments', icon: 'mdi-elevation-rise' },
    { name: 'Settings', route: '/dashboard/settings', icon: 'mdi-cog-box' }
  ]
}
</script>
