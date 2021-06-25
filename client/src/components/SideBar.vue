<template>
  <v-navigation-drawer v-if="show" permanent app clipped :mini-variant="mini" mini-variant-width="80">
    <v-row class="fill-height" no-gutters>
      <v-col>
        <v-list nav>
          <v-list-item
            v-for="item in items"
            :key="item.name"
            :to="item.route"
            :class="mini && 'px-0'"
            active-class="primary--text"
            exact
            link
          >
            <v-list-item-action class="text-center">
              <v-icon v-html="item.icon" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="mini = !mini">
            <v-list-item-icon>
              <v-icon v-html="mini ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import auth from "../store/modules/auth";

@Component
export default class SideBar extends Vue {
  mini = true;

  items = [
  	{ name: "Visão Geral", route: "/dashboard/", icon: "mdi-view-dashboard" },
  	{ name: "Contas", route: "/contas", icon: "mdi-bank" },
  	{ name: "Transações", route: "/transacoes", icon: "mdi-cash-multiple" },
  	{ name: "Projeções", route: "/projecoes", icon: "mdi-poll" },
  	{ name: "Grupos", route: "/grupos", icon: "mdi-account-group" },
  ];

  get isAuthenticated() {
  	return auth.isAuthenticated;
  }

  get show() {
  	return auth.isAuthenticated && this.$route.path !== '/';
  }
}
</script>
