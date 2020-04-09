<template>
  <nb-item rounded>
    <nb-input
      :value="value"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('input', $event.target.value)"
    />
  </nb-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
  }
}
</script>
