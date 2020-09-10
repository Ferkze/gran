import UserModel, { IUser } from './models/UserModel'
import { UserRepository } from '..'
import { User } from '../../models/entities/User'

class MongooseUserRepository implements UserRepository {
	
	async getAllUsers(): Promise<User[]> {
		const users = await UserModel.find(null, '-accounts')
		return users.map(u => this.deserialize(u))
	}
	
	async findUserById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id)
		if (user) {
			return this.deserialize(user)
		}
		return null
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await UserModel.findOne({ email })
		if (user) {
			return this.deserialize(user)
		}
		return null
	}

	async saveUser(user: User): Promise<User> {
		const userDoc = await UserModel.create(user)
		return this.deserialize(userDoc)
	}

	async updateUser(user: User): Promise<User> {
		const { id, ...data } = user
		await UserModel.update({ _id: id }, data)
		return user
	}

	async deleteUser(userId: string): Promise<void> {
		await UserModel.deleteOne({ _id: userId })
		return
	}

	private deserialize(user: IUser): User {
		return {
			id: user._id as string,
			username: user.username,
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			accounts: user.accounts || [],
			budgets: user.budgets || [],
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}
	}

}

export default new MongooseUserRepository()