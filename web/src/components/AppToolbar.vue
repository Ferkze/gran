<template>
  <v-app-bar app dense flat>
    <v-toolbar-title class="headline text-uppercase" @click="$router.push('/')">
      <span>FKZ</span>
      <span class="font-weight-light">FINANCE</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="$router.push('/dashboard')" text>Dashboard</v-btn>
      <v-btn @click="$router.push('/login')" text>Login</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // ...mapState('user')
  },
  mounted() {}
}
</script>