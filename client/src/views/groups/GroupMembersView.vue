<template>
	<v-container class="">
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
					<v-row no-gutters align="center">
						<v-col>
							<v-card-title>
								<h2 class="title font-weight-medium">Membros</h2>
							</v-card-title>
						</v-col>
						<v-col class="text-right px-4">
							<v-btn class="primary px-6" depressed small>
								<span class="text-lowercase">adicionar membro</span>
							</v-btn>
						</v-col>
					</v-row>
					<v-row no-gutters align="center">
						<v-card-text v-if="members.length > 0">
							<v-list two-line>
								<member-list-item v-for="member in members" :key="member.id" :member="member" />
							</v-list>
						</v-card-text>
						<v-card-text v-else>
							<p class="text-center">Não há ninguém além de você</p>
							<p class="text-center">Comece adicionando novos membros no botão acima</p>
						</v-card-text>
					</v-row>
        </v-card>
      </v-col>
    </v-row>
	</v-container>
</template>

<script lang="ts">
import { User } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import groupsModule from '@/store/modules/groupsModule'

@Component({
	components: {
		MemberListItem: () => import('@/components/group/MemberListItem.vue'),
	}
})
export default class GroupMembersView extends Vue {
	get members(): User[] {
		return groupsModule.selectedGroupMembers
	}
}
</script>
