<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col>
        <v-card>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Criar planejamento</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <planning-stepper-form :data.sync="planning" @submit="finishPlanning" :loading="loading" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Budget, Planning } from "@/models";
import { CategoryType } from "@/models/enums";
import finances from "@/store/modules/finances";
import planningModule from "@/store/modules/planningModule";
import status from "@/store/modules/status";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    PlanningStepperForm: () =>
      import("@/components/planning/PlanningStepperForm.vue"),
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Você tem alterações que não foram salvas, deseja realmente sair?"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
})
export default class CreatePlanningView extends Vue {
  planning: Planning = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    budgets: [],
  };
  loading = false;

  mounted() {
    if (this.$route.query.mes && this.$route.query.ano) {
      this.planning.year = parseInt(this.$route.query.ano as string);
      this.planning.month = parseInt(this.$route.query.mes as string);
    }
  }

  async finishPlanning() {
    this.loading = true;
    try {
      await planningModule.createPlanning(this.planning);
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
