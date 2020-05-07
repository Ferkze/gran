<template>
  <router-link
    :to="{ name: 'Home' }"
    aria-label="Gran Home Page"
    class="d-flex align-center text--primary"
    style="text-decoration: none;"
    title="Gran Home Page"
  >
    <!-- <v-img
      :src="`https://cdn.vuetifyjs.com/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light'}.png`"
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      transition="scale-transition"
      width="40"
    /> -->
    <v-sheet class="display-1 hidden-sm-and-down font-weight-medium mr-0 mr-md-4" color="transparent">
      Gran
    </v-sheet>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseGranLogo',
  inject: ['theme']
})
export default class GranLogo extends Vue {}
</script>
