<template>
  <router-link
    :to="{ name: 'Home' }"
    aria-label="Gran Home Page"
    class="d-flex align-center text--primary"
    style="text-decoration: none;"
    title="Gran Home Page"
  >
    <v-img
      :src="require('@/assets/gran-logo.svg')"
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      transition="scale-transition"
      width="40"
    />
    <v-sheet class="display-1 hidden-sm-and-down mr-0 mr-md-4 mb-2" color="transparent">
      <span class="font-weight-regular text-h5">gran</span>
      <span class="font-weight-light text-h5">finance</span>
    </v-sheet>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "BaseGranLogo",
  inject: ["theme"],
})
export default class GranLogo extends Vue {}
</script>
