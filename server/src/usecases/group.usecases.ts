import { Repositories } from '../repositories'
import { GroupUsecases } from '.'

export class GroupUsecasesImpl implements GroupUsecases {
	
	constructor(private repo: Repositories) { }
	
	editGroup(id: any, data: any): Promise<any> {
		throw new Error('Method not implemented.')
	}
	listGroups(userId: string): Promise<any[]> {
		throw new Error('Method not implemented.')
	}
	registerGroup(data: any): Promise<any> {
		throw new Error('Method not implemented.')
	}
	joinGroup(userId: string, groupId: any): Promise<void> {
		throw new Error('Method not implemented.')
	}
	
	
}