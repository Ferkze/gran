<template>
  <v-container class="">
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
					<v-row no-gutters align="center">
						<v-col>
							<v-card-title>
								<h2 class="title font-weight-medium">Grupos Financeiros</h2>
							</v-card-title>
						</v-col>
						<v-col class="text-right px-4">
							<v-btn class="primary px-6" depressed to="/grupos/criar">
								<span class="text-lowercase">criar grupo</span>
							</v-btn>
						</v-col>
					</v-row>
					<v-card-text v-if="groups">
						<div class="font-weight-regular grey--text text--darken-3 mb-3">Grupos em que faço parte</div>
						<v-list>
							<group-list-item v-for="group in groups" :key="group.id" :group="group" />
						</v-list>
					</v-card-text>
					<v-card-text v-else>
						<p class="text-center">Nenhum planejamento para o mês foi criado</p>
						<p class="text-center">Comece pelo botão acima</p>
					</v-card-text>
        </v-card>
      </v-col>
    </v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import groupsModule from '@/store/modules/groupsModule'

@Component({
	components: {
		GroupListItem: () => import('@/components/group/GroupListItem.vue')
	}
})
export default class GroupsView extends Vue {
  get groups() {
    return groupsModule.groups
  }
}
</script>
