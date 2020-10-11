import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import GroupsService from '@/service/api/GroupsService'
import auth from './auth'

import { Group, Planning, PlanningFilter, Transaction, TransactionFilter, User } from '@/models'
import TransactionService from '@/service/api/TransactionService'
import status from './status'
import PlanningService from '@/service/api/PlanningService'

@Module({
	store,
	dynamic: true,
	namespaced: true,
	name: 'groups'
})
class GroupModule extends VuexModule {
	groups: Group[] = [
		{ 
			id: '001',
			name: 'Família Martins',
			creator: '00001',
			members: [
				'0002',
				'0003',
				'0004'
			],
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{ 
			id: '002',
			name: 'Praia com os trutas',
			creator: '00001',
			members: [
				'0002',
				'0003',
				'0004'
			],
			createdAt: new Date(),
			updatedAt: new Date(),
		}
	]

	selectedGroup: Group | null = null
	selectedGroupTransactions: Transaction[] = []
	selectedGroupPlannings: Planning[] = []
	selectedGroupMembers: User[] = []

	get groupIds() {
		return this.groups.map(a => a.id)
	}

	@Action({ commit: 'setGroups', rawError: true })
	async fetchGroups(): Promise<Group[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await GroupsService.getGroups()
	}

	@Action({ commit: 'addGroup', rawError: true })
	async createGroup(group: Group): Promise<Group | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await GroupsService.createGroup(group)
	}

	@Action({ commit: 'replaceGroup', rawError: true })
	async changeGroup(group: Group): Promise<Group | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await GroupsService.updateGroup(group)
	}

	@Action({ commit: 'removeGroup', rawError: true })
	async deleteGroup(group: Group): Promise<Group | null> {
		if (!auth.user || !auth.user.id || !group.id) {
			return null
		}
		await GroupsService.deleteGroup(group.id)
		return group
	}

	@Action
	async selectGroup(groupId: Group['id']) {
		if (this.groups.length == 0) {
			status.setStatus({
				message: 'Grupos não localizados, tente novemente',
				type: 'warning'
			})
			return
		}
		const group = this.groups.find(g => g.id == groupId)
		if (!group) {
			this.setSelectedGroup(null)
			return
		}
		this.setSelectedGroup(group)
	}

	@Action({ commit: 'setSelectedGroupTransactions', rawError: true })
	async getSelectGroupTransactions(filter: TransactionFilter): Promise<Transaction[]> {
		if (!this.selectedGroup) {
			return []
		}
		filter.group = this.selectedGroup.id
		const transactions = await TransactionService.getTransactions(filter)
		return transactions
	}

	@Action({ commit: 'setSelectedGroupPlannings', rawError: true })
	async getSelectGroupPlannings(filter: PlanningFilter): Promise<Planning[]> {
		if (!this.selectedGroup) {
			return []
		}
		filter.group = this.selectedGroup.id
		const plannings = await PlanningService.getPlannings(filter)
		return plannings
	}

	@Action({ commit: 'setSelectedGroupMembers', rawError: true })
	async getSelectGroupMembers(): Promise<User[]> {
		if (!this.selectedGroup) {
			return []
		}
		const members = await GroupsService.getGroupMembers(this.selectedGroup.id)
		return members
	}

	@Action({ commit: 'setSelectedGroupMembers', rawError: true })
	async saveGroupMembers(userIds: User['id'][]): Promise<User[]> {
		if (!this.selectedGroup) {
			return []
		}
		const members = await GroupsService.saveGroupMembers(this.selectedGroup.id, userIds)
		return members
	}
	
	@Mutation
	setGroups(groups: Group[]) {
		this.groups = groups
	}

	@Mutation
	addGroup(group: Group) {
		this.groups.push(group)
	}

	@Mutation
	replaceGroup(group: Group) {
		const index = this.groups.findIndex(a => a.id == group.id)
		this.groups.splice(index, 1, group)
	}

	@Mutation
	removeGroup(group: Group) {
		const index = this.groups.findIndex(a => a.id == group.id)
		this.groups.splice(index, 1)
	}

	@Mutation
	setSelectedGroup(group: Group | null) {
		this.selectedGroup = group
	}
	@Mutation
	setSelectedGroupTransactions(transactions: Transaction[]) {
		this.selectedGroupTransactions = transactions
	}
	@Mutation
	setSelectedGroupMembers(members: User[]) {
		this.selectedGroupMembers = members
	}
	@Mutation
	setSelectedGroupPlannings(plannings: Planning[]) {
		this.selectedGroupPlannings = plannings
	}

}

export default getModule(GroupModule)
