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
import { Component, Vue } from 'vue-property-decorator'
import auth from '../store/modules/auth'

@Component({
  components: {
    WebRail: () => import('../components/WebRail.vue')
  }
})
export default class Dashboard extends Vue {
  mounted() {
    console.log('Dashboard: user', auth.user)
  }
}
</script>
