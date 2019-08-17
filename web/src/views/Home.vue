<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div id="firebaseui-auth-container"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
export default {
  mounted() {
    console.log(firebase, firebaseui);
    var uiConfig = {
      signInSuccessUrl: "/about",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
