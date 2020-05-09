<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-subheader>
        <slot name="label">{{ formLabel }}</slot>
      </v-subheader>
    </v-col>
    <v-col cols="12">
      <slot name="default">
        <component :is="`base-${fieldType}`" v-bind="$attrs" v-on="$listeners" />
      </slot>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import BaseDatePicker from './DatePicker.vue'
import BaseSelect from './Select.vue'
import BaseTextField from './TextField.vue'

@Component({
  components: {
    BaseDatePicker,
    BaseSelect,
    BaseTextField
  },
  name: 'BaseFormField',
  inheritAttrs: false
})
export default class BaseFormField extends Vue {
  @Prop({ type: String, default: 'text-field' }) fieldType!: string
  @Prop({ type: String, default: '' }) formLabel!: string
}
</script>
