<template>
  <v-select :background-color="bgColor" flat solo v-bind="$attrs" v-on="$listeners">
    <template v-slot:item="slotProps">
      <slot name="item-tile" v-bind="slotProps">
        <v-list-item v-bind="slotProps.attrs" v-on="slotProps.on">{{ slotProps.item.text }}</v-list-item>
      </slot>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AppTextField",
})
export default class AppTextField extends Vue {
  get bgColor() {
    if (this.$vuetify.theme.dark) {
      return "grey darken-2";
    }
    return "grey lighten-3";
  }
}
</script>
