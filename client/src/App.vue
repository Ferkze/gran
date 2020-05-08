<template>
  <v-app>
    <app-bar />
    <app-snackbar />

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
import { _currentUser } from './service/api/auth'
import auth from './store/modules/auth'

@Component({
  components: {
    AppBar,
    AppSnackbar: () => import('@/components/AppBar.vue')
  },
  name: 'App'
})
export default class App extends Vue {
  mounted() {
    auth.setUser(_currentUser())
  }
}
</script>
