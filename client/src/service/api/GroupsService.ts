import client from './ApiService'
import { Group } from '@/models'

interface GroupResponse {
	group: Group
}

interface GroupsResponse {
	groups: Group[]
}

class GroupsService {
	async getGroups(): Promise<Group[]> {
		const response = await client.get<GroupsResponse>('/api/groups')
		const groups = response.data.groups
		return groups
	}

	async getGroupMembers(groupId: Group['id']) {
		const response = await client.get(`/api/groups/${groupId}/members`)
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.members
	}

	async getGroupPlannings(groupId: Group['id']) {
		const response = await client.get(`/api/groups/${groupId}/plannings`)
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.plannings
	}

	async createGroup(group: Group) {
		const response = await client.post<GroupResponse>('/api/groups', { group })
		return response.data.group
	}

	async updateGroup(group: Group) {
		const response = await client.put<GroupResponse>(`/api/groups/${group.id}`, { group })
		return response.data.group
	}

	async deleteGroup(groupId: Group['id']) {
		const response = await client.delete(`/api/groups/${groupId}`)
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return
	}
}

export default new GroupsService()
