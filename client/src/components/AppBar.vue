<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>G R A N</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items v-show="!authMod.isAuthenticated">
        <v-btn text @click="$router.push('/entrar')">Entrar</v-btn>
      </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/store/modules/AuthModule'

@Component
export default class AppBar extends Vue {
    authMod: AuthModule = getModule(AuthModule, this.$store)

}
</script>

<style>

</style>