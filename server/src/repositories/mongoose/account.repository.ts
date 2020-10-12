import { AccountRepository } from '..'
import { Account } from '../../models/entities/Account'
import { User } from '../../models/entities/User'
import DatabaseError from '../../models/errors/DatabaseError'
import { IAccount } from './models/AccountSchema'
import UserModel from './models/UserModel'

export class MongooseAccountRepository implements AccountRepository {
	
	async getAllUserAccounts(userId: string): Promise<Account[]> {
		const userDoc = await UserModel.findOne({ _id: userId }, 'accounts')
		return userDoc.accounts.map(MongooseAccountRepository.deserializeAccount)
	}
	
	async findAccountById(userId: User['id'], accountId: Account['id']): Promise<Account> {
		const userDoc = await UserModel.findById(userId)
		return MongooseAccountRepository.deserializeAccount(userDoc.accounts.id(accountId))
	}
	
	async saveAccount(userId: User['id'], account: Account): Promise<Account> {
		const userDoc = await UserModel.findById(userId)
		userDoc.accounts.push(account)
		await userDoc.save()
		return MongooseAccountRepository.deserializeAccount(userDoc.accounts[userDoc.accounts.length-1])
	}
	
	async updateAccount(userId: User['id'], accountId: Account['id'], data: Account): Promise<Account> {
		const userDoc = await UserModel.findById(userId)
		const accountDoc = userDoc.accounts.id(accountId)
		for (const key in data) {
			accountDoc[key] = data[key]
		}
		await userDoc.save()
		return MongooseAccountRepository.deserializeAccount(accountDoc)
	}
	
	async deleteAccount(userId: User['id'], accountId: string): Promise<void> {
		const userDoc = await UserModel.findById(userId)
		userDoc.accounts.id(accountId).remove()
		await userDoc.save()
	}

	async accountExists(userId: User['id'], accountId: Account['id']): Promise<boolean> {
		try {
			const userDoc = await UserModel.findById(userId)
			return userDoc.accounts.some(acc => acc.id == accountId)
		} catch (error) {
			throw new DatabaseError(error)
		}
	}

	static deserializeAccount(accountModel: IAccount): Account {
		if (accountModel == null) return null
		return {
			id: accountModel._id,
			name: accountModel.name,
			main: accountModel.main,
			institution: accountModel.institution,
			unregisteredInstitution: accountModel.unregisteredInstitution,
			type: accountModel.type,
			subtype: accountModel.subtype,
			startingBalance: accountModel.startingBalance,
			owner: accountModel.owner,
			createdAt: accountModel.createdAt,
			updatedAt: accountModel.updatedAt,
		}
	}

}

export default new MongooseAccountRepository()