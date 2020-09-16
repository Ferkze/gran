import { Repositories } from '../repositories'
import { UserUsecases } from '.'
import { User } from '../models/entities/User'

export class UserUsecasesImpl implements UserUsecases {
	
	constructor(private repo: Repositories) { }

	async editUser(id: User['id'], data: User): Promise<User> {
		return await this.repo.user.updateUser(id, data)
	}

	getUser(id: string): Promise<User> {
		throw new Error('Method not implemented.')
	}
	
	async listUsers(): Promise<User[]> {
		return await this.repo.user.getAllUsers()
	}
	
}