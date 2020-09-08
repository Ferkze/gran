import UserModel from './models/UserModel'
import { UserRepositoryInterface } from '..'
import { User } from '../../models/entities/User'
import { deserializeUser } from './serializer'

class UserRepository implements UserRepositoryInterface {
	
	async getAllUsers(): Promise<User[]> {
		const users = await UserModel.find(null, '-accounts')
		return users.map(u => deserializeUser(u))
	}
	
	async findUserById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id)
		if (user) {
			return deserializeUser(user)
		}
		return null
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await UserModel.findOne({ email })
		if (user) {
			return deserializeUser(user)
		}
		return null
	}

	async saveUser(user: User): Promise<User> {
		const userDoc = await UserModel.create(user)
		return deserializeUser(userDoc)
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

}

export default new UserRepository()