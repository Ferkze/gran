<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
          <v-card-title>
            <v-btn icon class="mr-2" @click="$router.go(-1)">
              <v-icon color="black">mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="title font-weight-medium">Criar grupo</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-col cols="8" xs="12">
                <group-form :data.sync="group" @submit="createGroup" :loading="loading" />
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
import auth from '@/store/modules/auth';
import { Group } from '@/models';

@Component({
	components: {
		GroupForm: () => import('@/components/group/GroupForm.vue')
	}
})
export default class CreateGroupView extends Vue {
  loading = false
  group: Group = {
  	name: '',
  	creator: this.currentUserId,
  	members: [ this.currentUserId ],
  	plannings: []
  }

  get currentUserId() {
  	return auth.user ? auth.user.id : ''
  }
  
  async createGroup() {
  	this.loading = true
  	await groupsModule.createGroup(this.group)
  	this.$router.push('/grupos')
  	this.loading = false
  }
}
</script>
