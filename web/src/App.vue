<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>FKZ</span>
        <span class="font-weight-light">FINANCE</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-layout>
          <v-flex class="mx-2">
            <v-card>
              <v-card-title>Saldo</v-card-title>
              <v-card-text>R$ 0</v-card-text>
            </v-card>
          </v-flex>
          <v-flex class="mx-2">
            <v-card>
              <v-card-title>Receitas</v-card-title>
              <v-card-text>R$ 0</v-card-text>
            </v-card>
          </v-flex>
          <v-flex class="mx-2">
            <v-card>
              <v-card-title>Despesas</v-card-title>
              <v-card-text>R$ 0</v-card-text>
            </v-card>
          </v-flex>
          <v-flex class="mx-2">
            <v-card>
              <v-card-title>Crédito</v-card-title>
              <v-card-text>R$ 0</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
})
</script>
