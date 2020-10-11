<template>
	<v-dialog v-model="show" width="520">
		<v-card>
			<v-card-title>Adicionar membro</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="searchEmail">
					<base-form-field
						form-label="Digite o email do novo membro"
						placeholder="Email"
					/>
					<v-btn type="submit" block color="primary" @submit.prevent="searchEmail">Buscar</v-btn>
				</v-form>
				<v-divider class="mt-5" />
				<v-list-item v-for="member in members" :key="member.id">
					<v-list-item-avatar>
						<v-icon color="black" left large>mdi-account-circle</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ member.firstName }}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon @click="remove(member.id)">
							<v-icon color="red">mdi-close</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-btn
					v-if="members.length > 0"
					block
					color="primary"
					@click="saveMembers"
				>
					Salar membros
				</v-btn>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Group, User } from '@/models';
import GroupsService from '@/service/api/GroupsService';
import groupsModule from '@/store/modules/groupsModule';
import status from '@/store/modules/status';
	import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';

@Component({
	components: {
		BaseFormField: () => import('@/components/base/FormField.vue'),
	}
})
	export default class GroupMembersDialog extends Vue {
		@PropSync('dialog', { type: Boolean, default: true })
		show!: boolean

		@Prop({ required: true, type: String })
		groupId!: Group['id']

		members: User[] = []

		memberEmail = ''

		loading = false

		mounted() {
			this.members.push(...groupsModule.selectedGroupMembers)
		}

		async searchEmail() {
			const user = await GroupsService.findUserByEmail(this.memberEmail)
			if (user) {
				this.members.push(user)
			} else {
				status.setStatus({
					message: 'Usuário não encontrado',
					type: 'warning'
				})
			}
			this.memberEmail = ''
		}

		remove(memberId: User['id']) {
			const index = this.members.findIndex(member => member.id == memberId)
			this.members.splice(index, 1)
		}

		async saveMembers() {
			const userIds = this.members.map( m => m.id)
			try {
				this.loading = true
				await groupsModule.saveGroupMembers(userIds)
				this.show = false
			} catch(error) {
				status.setStatus({
					message: 'Não foi possível salvar os membros do grupo',
					type: 'error'
				})
			} finally {
				this.loading = false
			}

		}
	}
</script>

<style scoped>

</style>