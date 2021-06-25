<template>
  <v-form @submit.prevent="submit">
    <base-form-field
      v-model="group.name"
      field-type="text-field"
      form-label="Nome do grupo"
      hide-details
      placeholder="Nome do grupo"
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
        @submit.prevent="submit"
      >Salvar</v-btn>
    </div>
    <!-- <v-btn block color="error" class="mt-5" outlined :disabled="loadingDeletion" :loading="loadingDeletion" large @click="deleteTransaction">Deletar Transação</v-btn>-->
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";
import { Group } from '@/models';

@Component({
	components: {
		BaseDatePicker: () => import("@/components/base/DatePicker.vue"),
		BaseFormField: () => import("@/components/base/FormField.vue"),
	},
})
export default class GroupForm extends Vue {
	@PropSync("data", { required: true })
  group!: Group
  
  @Prop({ default: false })
  loading!: boolean

  @Emit("submit")
  async submit() {}
}
</script>