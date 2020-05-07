<template>
  <v-app-bar :color="!theme.isDark ? 'white' : undefined" app clipped-left clipped-right flat>
    <base-gran-logo />
    <v-spacer />

    <v-spacer />
    <v-toolbar-items v-show="!isAuthenticated">
      <v-btn text @click="$router.push('/entrar')">
        <span class="subtitle-1 text-capitalize font-weight-light">
          Entrar
        </span>
      </v-btn>
      <v-btn text @click="$router.push('/cadastrar')">
        <span class="subtitle-1 text-capitalize font-weight-light">
          Cadastrar
        </span>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-show="isAuthenticated">
      <v-btn text to="/dashboard" active-class="primary--text">
        <span class="subtitle-1 text-capitalize font-weight-light">
          Dashboard
        </span>
      </v-btn>
      <v-btn icon color="primary" to="/configuracoes">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../store/modules/auth'

@Component({
  components: {
    BaseGranLogo: () => import('../components/base/GranLogo.vue')
  },
  inject: ['theme']
})
export default class AppBar extends Vue {
  get isAuthenticated() {
    return auth.isAuthenticated
  }
}
</script>
