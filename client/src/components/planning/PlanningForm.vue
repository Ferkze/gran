<template>
  <v-form @submit.prevent="submitPlanning"> 
    <v-subheader class="px-0 font-weight-light">Mês do planejamento</v-subheader>
    <v-date-picker
      v-model="monthData"
      class="elevation-0"
      color="primary"
      full-width
      header-color="secondary"
      landscape
      locale="pt-br"
      type="month"
      title="Selecione um mês"
    />
    <div class="text-center">
      <v-btn
        type="submit"
        block
        color="primary"
        class="mt-5"
        :disabled="loading"
        :loading="loading"
        large
        @submit.prevent="submitPlanning"
        v-text="submitText"
      />
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";
import { Planning } from "@/models";
import { AccountSubtypes, CategoryType } from "@/models/enums";
import accounts from "@/store/modules/accounts";
import finances from '@/store/modules/finances';
import groupsModule from "@/store/modules/groupsModule";
import status from '@/store/modules/status';

@Component({
  components: {
    BaseDatePicker: () => import("@/components/base/DatePicker.vue"),
    BaseFormField: () => import("@/components/base/FormField.vue"),
  },
})
export default class PlanningForm extends Vue {
  @PropSync("data", { required: true })
  planning!: Planning;

  @Prop({ type: Boolean, default: false })
  loading!: boolean;

  @Prop({ type: String, default: 'Salvar' })
  submitText!: string;

  // repeat = 0

  get monthData() {
    return `${this.planning.year}-${this.planning.month.toString().padStart(2, '0')}`
  }
  set monthData(value: string) {
    const dates = value.split('-')
    this.planning.year = parseInt(dates[0])
    this.planning.month = parseInt(dates[1])
  }

  @Emit("submit")
  async submitPlanning() {}
}
</script>
