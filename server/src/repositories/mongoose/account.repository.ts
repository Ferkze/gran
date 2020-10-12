import { AccountRepository } from '..'
import { Account } from '../../models/entities/Account'
import { User } from '../../models/entities/User'
import UserModel from './models/UserModel'

export class MongooseAccountRepository implements AccountRepository {
	
	async getAllUserAccounts(userId: string): Promise<Account[]> {
		const userDoc = await UserModel.findById(userId)
		return userDoc.accounts.map(a => a.getAccount())
	}
	
	async findAccountById(userId: User['id'], accountId: Account['id']): Promise<Account> {
		const userDoc = await UserModel.findById(userId)
		return userDoc.accounts.id(accountId).getAccount()
	}
	
	async saveAccount(userId: User['id'], account: Account): Promise<Account> {
		const userDoc = await UserModel.findById(userId)
		userDoc.accounts.push(account)
		await userDoc.save()
		return userDoc.accounts[userDoc.accounts.length-1].getAccount()
	}
	
	async updateAccount(userId: User['id'], accountId: Account['id'], data: Account): Promise<Account> {
		const userDoc = await UserModel.findById(userId)
		const accountDoc = userDoc.accounts.id(accountId)
		for (const key in data) {
			accountDoc[key] = data[key]
		}
		await userDoc.save()
		return accountDoc.getAccount()
	}
	
	async deleteAccount(userId: User['id'], accountId: string): Promise<void> {
		const userDoc = await UserModel.findById(userId)
		userDoc.accounts.id(accountId).remove()
		await userDoc.save()
	}

	async accountExists(userId: User['id'], accountId: Account['id']): Promise<boolean> {
		const userDoc = await UserModel.findById(userId)
		return userDoc.accounts.some(acc => acc.id == accountId)
	}

}

export default new MongooseAccountRepository()