<template>
  <v-app>
    <app-bar />

    <v-content>
      <v-slide-x-reverse-transition mode="out-in">
        <router-view />
      </v-slide-x-reverse-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from '@/components/AppBar.vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { authenticate } from './service/AuthService'
import AuthModule from './store/modules/AuthModule'

@Component({
  components: {
    AppBar
  },
  name: 'App'
})
export default class App extends Vue {
  authMod = getModule(AuthModule, this.$store)

  mounted() {
    const user = authenticate()
    if (!user) {
      return
    }
    this.authMod.setUser(user)
  }
}
</script>
