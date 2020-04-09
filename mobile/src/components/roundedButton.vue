<template>
  <nb-button block rounded :style="{ margin: 15 }" @onPress="callback">
    <nb-text>{{ text }}</nb-text>
  </nb-button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    callback: {
      type: Function
    }
  }
}
</script>

<style>

</style>