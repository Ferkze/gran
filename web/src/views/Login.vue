<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div id="firebaseui-auth-container"></div>
      </v-flex>
      <v-flex>
        <div id="loader">Loading...</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/resources/firebase.js'
import * as firebaseui from 'firebaseui'
export default {
  mounted() {
    console.log(firebase)
    var uiConfig = {
      callbacks: {
        uiShown: () => {
          document.getElementById('loader').style.display = 'none'
        }
      },
      signInFlow: 'popup',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    if (ui.isPendingRedirect()) {
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
}
</script>
