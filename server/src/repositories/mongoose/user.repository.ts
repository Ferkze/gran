import UserModel from './models/UserModel'
import { UserRepository } from '..'
import { User } from '../../models/entities/User'

export class MongooseUserRepository implements UserRepository {
	
	async getAllUsers(): Promise<User[]> {
		const users = await UserModel.find(null, '-accounts')
		return users.map(u => u.getUser())
	}
	
	async findUserById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id)
		if (user) {
			return user.getUser()
		}
		return null
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await UserModel.findOne({ email }, '-accounts')
		if (user) {
			return user.getUser()
		}
		return null
	}

	async saveUser(user: User): Promise<User> {
		const userDoc = await UserModel.create(user)
		return userDoc.getUser()
	}

	async updateUser(userId: User['id'], user: User): Promise<User> {
		const userDoc = await UserModel.findByIdAndUpdate(userId, user)
		return userDoc.getUser()
	}

	async deleteUser(userId: string): Promise<void> {
		await UserModel.deleteOne({ _id: userId })
	}

}

export default new MongooseUserRepository()