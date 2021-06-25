<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Editar grupo</h2>
          </v-card-title>
          <v-card-text v-if="!loading">
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <group-form :data.sync="group" @submit="updateGroup" />
              </v-col>
            </v-row>  
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import groupsModule from '@/store/modules/groupsModule'
import status from '@/store/modules/status';
import { Group } from '@/models';

@Component({
	components: {
		GroupForm: () => import('@/components/group/GroupForm.vue')
	}
})
export default class EditGroupView extends Vue {
  loading = false
  editing = false

  async updateGroup() {
  	try {
  		if (!this.group) return
  		this.editing = true
  		await groupsModule.changeGroup(this.group)
  	} catch (error) {
  		status.setStatus({
  			message: 'Erro ao salvar a edição do grupo',
  			type: 'error'
  		})
  	} finally {
  		this.editing = false
  	}
  }

  get group(): Group | null {
  	const group = groupsModule.groups.find(g => g.id == this.$route.params.groupId)
  	if (!group) {
  		this.getGroup()
  		return null
  	}
  	return group
  }
  set group(group: Group | null) {
  	if (!group) return
  	groupsModule.replaceGroup(group)
  }

  async getGroup() {
  	this.loading = true
  	if (!groupsModule.groups.length) {
  		await groupsModule.fetchGroups()
  	}
  	this.loading = false
  }

  async created() {
  	if (!groupsModule.groups.length) {
  		const groups = await groupsModule.fetchGroups();
  		if (!groups.length) {
  			this.$router.go(-1);
  			status.setStatus({
  				message: 'Grupo inválido para edição',
  				type: 'warning'
  			})
  		}
  	}
  }
}
</script>
