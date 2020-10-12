<template>
  <v-dialog v-model="show" width="780">
    <v-card>
      <v-card-title>Criar planejamento</v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="8" xs="12">
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
    budgets: [],
  };
  loading = false;

  async finishPlanning() {
    this.loading = true;
    try {
      await groupsModule.saveGroupPlanning(this.planning);
      status.setStatus({
        type: "success",
        message: "Planejamento criado com sucesso",
      });
      this.$router.push(
        `/planejamento?mes=${this.planning.month}&ano=${this.planning.year}`
      );
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