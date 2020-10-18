import { GroupRepository } from '..'
import { Group } from '../../models/entities/Group'
import { User } from '../../models/entities/User'
import GroupModel from './models/GroupModel'

class MongooseGroupRepository implements GroupRepository {

	async getAllUserGroups(userId: Group['id']): Promise<Group[]> {
		const groupDocs = await GroupModel.find({ 
			$or: [
				{ members: { $in: [ userId ] } }
			]
		}).populate('creator members')
		return groupDocs.map(g => g.getGroup())
	}
	async findGroupById(groupId: string): Promise<Group> {
		const groupDoc = await GroupModel.findById(groupId).populate('creator members')
		return groupDoc.getGroup()
	}
	async saveGroup(group: Group): Promise<Group> {
		const groupDoc = await GroupModel.create(group)
		return await this.findGroupById(groupDoc.id)
	}
	async updateGroup(groupId: Group['id'], data: any): Promise<Group> {
		const groupDoc = await GroupModel.findById(groupId)
		for (const key in data) {
			groupDoc[key] = data[key]
		}
		await groupDoc.save()
		return await this.findGroupById(groupId)
	}
	async deleteGroup(userId: User['id'], groupId: string): Promise<boolean> {
		const res = await GroupModel.deleteOne({ _id: groupId, creator: userId })
		return res.deletedCount > 0
	}
	
}

export default new MongooseGroupRepository()