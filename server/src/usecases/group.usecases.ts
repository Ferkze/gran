import { Repositories } from '../repositories'
import { GroupUsecases } from '.'
import { Group } from '../models/entities/Group'
import { UsecaseError } from '../models/errors/UsecaseError'
import { User } from '../models/entities/User'

export class GroupUsecasesImpl implements GroupUsecases {
	
	constructor(private repo: Repositories) { }
	
	async editGroup(groupId: Group, data: any): Promise<Group> {
		return this.repo.group.updateGroup(groupId, data)
	}

	async listGroups(userId: User['id']): Promise<Group[]> {
		return await this.repo.group.getAllUserGroups(userId)
	}

	async registerGroup(userId: User['id'], data: any): Promise<Group> {
		data.creator = userId
		if (data.members && !data.members.some(member => member.id == userId)) {
			data.members.push(userId)
		}
		return await this.repo.group.saveGroup(data)
	}

	async joinGroup(userId: User['id'], groupId: any): Promise<void> {
		const group = await this.repo.group.findGroupById(groupId)
		if (group.members.some(member => member.id == userId)) {
			throw new UsecaseError('Usuário já faz parte do grupo')
		}
		await this.repo.group.updateGroup(groupId, { members: [...group.members.map(m => m.id), userId ]})
		return
	}

	async deleteGroup(userId: User['id'], groupId: Group['id']): Promise<boolean> {
		return await this.repo.group.deleteGroup(userId, groupId)
	}
	
}