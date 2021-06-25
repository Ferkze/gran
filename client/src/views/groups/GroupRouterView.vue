<template>
  <v-container class>
    <v-card v-if="group">
      <v-row no-gutters align="center">
        <v-col>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Grupo {{ group.name }}</h2>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="pa-3">
          <v-btn
            :to="`/grupos/${groupId}/planejamento`"
            active-class="primary white--text"
            block
            color="white"
            class="elevation-1 py-5"
            small
            tile
          >
            <span class="text-uppercase">PLANEJAMENTO</span>
          </v-btn>
        </v-col>
        <v-col class="pa-3">
          <v-btn
            :to="`/grupos/${groupId}/transacoes`"
            active-class="primary"
            block
            color="white"
            class="elevation-1 py-5"
            small
            tile
          >
            <span class="text-uppercase">TRANSAÇÕES</span>
          </v-btn>
        </v-col>
        <v-col class="pa-3">
          <v-btn
            :to="`/grupos/${groupId}/membros`"
            active-class="primary"
            block
            color="white"
            class="elevation-1 py-5"
            small
            tile
          >
            <span class="text-uppercase">MEMBROS</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-slide-x-reverse-transition mode="out-in">
        <router-view />
      </v-slide-x-reverse-transition>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import groupsModule from "@/store/modules/groupsModule";
import { Component, Vue } from "vue-property-decorator";
import finances from "../../store/modules/finances";

@Component
export default class GroupRouterView extends Vue {
  groupId = "";

  mounted() {
  	this.groupId = this.$route.params.groupId;
  	groupsModule.selectGroup(this.groupId);
  }

  get group() {
  	return groupsModule.selectedGroup;
  }
}
</script>
