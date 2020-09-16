import { GroupRepository } from '..'
import { Group } from '../../models/entities/Group'

class MongooseGroupRepository implements GroupRepository {
	getAllGroups(): Promise<Group[]> {
		throw new Error('Method not implemented.')
	}
	getAllUserGroups(userId: string): Promise<Group[]> {
		throw new Error('Method not implemented.')
	}
	findGroupById(id: string): Promise<Group> {
		throw new Error('Method not implemented.')
	}
	saveGroup(group: Group): Promise<Group> {
		throw new Error('Method not implemented.')
	}
	updateGroup(group: Group): Promise<Group> {
		throw new Error('Method not implemented.')
	}
	deleteGroup(groupId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
	

}

export default new MongooseGroupRepository()