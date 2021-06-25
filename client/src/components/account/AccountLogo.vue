<template>
  <v-avatar v-if="imageUrl" tile>
    <v-img :src="imageUrl" height="48" width="48"></v-img>
  </v-avatar>
  <v-avatar v-else rounded="0" color="secondary">
    <v-icon color="primary">mdi-bank</v-icon>
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AccountLogo extends Vue {
  @Prop({ required: false, type: String })
  imageUrl!: string;
}
</script>

<style scoped>
</style>