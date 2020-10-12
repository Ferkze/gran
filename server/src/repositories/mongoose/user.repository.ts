import UserModel, { UserDocument } from './models/UserModel'
import { UserRepository } from '..'
import { User } from '../../models/entities/User'

export class MongooseUserRepository implements UserRepository {
	
	async getAllUsers(): Promise<User[]> {
		const users = await UserModel.find(null, '-accounts')
		return users.map(u => MongooseUserRepository.deserializeUser(u))
	}
	
	async findUserById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id)
		if (user) {
			return MongooseUserRepository.deserializeUser(user)
		}
		return null
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await UserModel.findOne({ email }, '-accounts')
		if (user) {
			return MongooseUserRepository.deserializeUser(user)
		}
		return null
	}

	async saveUser(user: User): Promise<User> {
		const userDoc = await UserModel.create(user)
		return MongooseUserRepository.deserializeUser(userDoc)
	}

	async updateUser(userId: User['id'], user: User): Promise<User> {
		const userDoc = await UserModel.findByIdAndUpdate(userId, user)
		return MongooseUserRepository.deserializeUser(userDoc)
	}

	async deleteUser(userId: string): Promise<void> {
		await UserModel.deleteOne({ _id: userId })
	}

	static deserializeUser(user: UserDocument): User {
		return {
			id: user._id,
			username: user.username,
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,		
			accounts: user.accounts,
			budgets: user.budgets,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		}
	}

}

export default new MongooseUserRepository()