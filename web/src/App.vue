<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>FKZ</span>
        <span class="font-weight-light">FINANCE</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "App",
  data: () => ({
    //
  }),
  mounted() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          console.log(user);
        }
      },
      function(error) {
        console.log(error);
      }
    );
  }
};
</script>
