<template>
  <v-dialog v-model="show" width="860">
    <v-card>
      <v-card-title>Criar planejamento</v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col xs="12">
            <planning-stepper-form :data.sync="planning" @submit="finishPlanning" :loading="loading" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Group, Planning, User } from "@/models";
import GroupsService from "@/service/api/GroupsService";
import auth from '@/store/modules/auth';
import groupsModule from "@/store/modules/groupsModule";
import status from "@/store/modules/status";
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
	components: {
		PlanningStepperForm: () =>
      import("@/components/planning/PlanningStepperForm.vue"),
	},
})
export default class GroupPlanningsDialog extends Vue {
  @PropSync("dialog", { type: Boolean, default: true })
  show!: boolean;

  @Prop({ required: true, type: String })
  groupId!: Group["id"];

  planning: Planning = {
  	month: new Date().getMonth() + 1,
  	year: new Date().getFullYear(),
  	user: auth.userId,
  	group: '',
  	budgets: [],
  };
  loading = false;

  mounted() {
  	this.planning.group = this.groupId
  }

  async finishPlanning() {
  	this.loading = true;
  	try {
  		await groupsModule.saveGroupPlanning(this.planning);
  		status.setStatus({
  			type: "success",
  			message: "Planejamento criado com sucesso",
  		});
  		this.show = false
  		this.$emit('update:dialog', false)
  	} catch (error) {
  		status.setStatus({
  			type: "error",
  			message: `Não foi possível criar o planejamento: ${error.toString()}`,
  		});
  		status.setError(error);
  	} finally {
  		this.loading = false;
  	}
  }
}
</script>

<style scoped>
</style>