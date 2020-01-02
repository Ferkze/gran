<template>
  <v-app>
    <app-toolbar></app-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/auth'
import { mapActions } from 'vuex'

import AppToolbar from '@/components/AppToolbar.vue'

export default {
  name: 'App',
  components: {
    AppToolbar
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions({
      authenticate: 'authenticate'
    })
  },
  mounted() {
    firebase.auth.onAuthStateChanged(
      function(user) {
        console.log('this is', this)
        if (user) {
          console.log(user)
          this.authenticate(user)
          this.$router.push('/dashboard')
        }
      },
      function(error) {
        console.log('this error is', this)
        console.log(error)
      }
    )
  }
}
</script>

