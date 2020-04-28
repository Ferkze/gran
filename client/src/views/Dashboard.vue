<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="3">
        <web-rail />
      </v-col>
      <v-col cols="9">
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import WebRail from '../components/WebRail.vue'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '../store/modules/AuthModule'

@Component({
  components: {
    WebRail
  }
})
export default class Dashboard extends Vue {
  authModule: AuthModule = getModule(AuthModule, this.$store)

  mounted() {
    console.log(this.authModule.user)
  }
}
</script>
