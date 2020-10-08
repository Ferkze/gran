import client from './ApiService'
import { Group } from '@/models'

interface GroupResponse {
	group: Group
}

interface GroupsResponse {
	groups: Group[]
}

class GroupService {
	async getGroups(): Promise<Group[]> {
		const response = await client.get<GroupsResponse>('/groups')
		const groups = response.data.groups
		return groups
	}

	async createGroup(group: Group) {
		const response = await client.post<GroupResponse>('/groups', { group })
		return response.data.group
	}

	async updateGroup(group: Group) {
		const response = await client.put<GroupResponse>(`/groups/${group.id}`, { group })
		return response.data.group
	}

	async deleteGroup(groupId: Group['id']) {
		const response = await client.delete(`/groups/${groupId}`)
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return
	}
}

export default new GroupService()
