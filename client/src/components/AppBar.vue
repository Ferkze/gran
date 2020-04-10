<template>
  <v-app-bar
    :color="!theme.isDark ? 'white' : undefined"
    app
    clipped-left
    clipped-right
    flat
  >
    <base-gran-logo />
    <v-spacer />

    <v-spacer />
    <v-toolbar-items v-show="!authMod.isAuthenticated">
      <v-btn
        text
        @click="$router.push('/entrar')"
      >
        <span class="subtitle-1 text-capitalize font-weight-light">
          Entrar
        </span>
      </v-btn>
      <v-btn
        text
        @click="$router.push('/cadastrar')"
      >
        <span class="subtitle-1 text-capitalize font-weight-light">
          Cadastrar
        </span>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { getModule } from 'vuex-module-decorators'
  import AuthModule from '../store/modules/AuthModule'
  import BaseGranLogo from '../components/base/GranLogo.vue'

  @Component({
    components: {
      BaseGranLogo,
    },
    inject: ['theme'],
  })
  export default class AppBar extends Vue {
    authMod: AuthModule = getModule(AuthModule, this.$store)
  }
</script>
