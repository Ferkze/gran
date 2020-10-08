import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import GroupService from '@/service/api/GroupService'
import auth from './auth'

import { Group } from '@/models'

@Module({
	store,
	dynamic: true,
	namespaced: true,
	name: 'groups'
})
class GroupModule extends VuexModule {
	groups: Group[] = []

	get groupIds() {
		return this.groups.map(a => a.id)
	}

	@Action({ commit: 'setGroups', rawError: true })
	async fetchGroups(): Promise<Group[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await GroupService.getGroups()
	}

	@Action({ commit: 'addGroup', rawError: true })
	async createGroup(group: Group): Promise<Group | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await GroupService.createGroup(group)
	}

	@Action({ commit: 'replaceGroup', rawError: true })
	async changeGroup(group: Group): Promise<Group | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await GroupService.updateGroup(group)
	}

	@Action({ commit: 'removeGroup', rawError: true })
	async deleteGroup(group: Group): Promise<Group | null> {
		if (!auth.user || !auth.user.id || !group.id) {
			return null
		}
		await GroupService.deleteGroup(group.id)
		return group
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

}

export default getModule(GroupModule)
