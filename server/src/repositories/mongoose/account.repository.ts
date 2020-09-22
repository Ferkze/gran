import { AccountRepository } from '..'
import { Account } from '../../models/entities/Account'
import AccountModel, { IAccount } from './models/AccountModel'

export class MongooseAccountRepository implements AccountRepository {
	
	async getAllAccounts(): Promise<Account[]> {
		const accounts = await AccountModel.find().populate('institution')
		return accounts.map(a => MongooseAccountRepository.deserializeAccount(a))
	}
	
	async getAllUserAccounts(userId: string): Promise<Account[]> {
		const accounts = await AccountModel.find({ owner: userId }).populate('institution')
		return accounts.map(a => MongooseAccountRepository.deserializeAccount(a))
	}
	
	async findAccountById(id: string): Promise<Account> {
		const account = await AccountModel.findOne({ _id: id }).populate('institution')
		return MongooseAccountRepository.deserializeAccount(account)
	}
	
	async saveAccount(account: Account): Promise<Account> {
		const doc = await AccountModel.create(account)
		return MongooseAccountRepository.deserializeAccount(doc)
	}
	
	async updateAccount(account: Account): Promise<Account> {
		const { id, ...data} = account
		const doc = await AccountModel.findByIdAndUpdate(id, data, { new: true })
		return MongooseAccountRepository.deserializeAccount(doc)
	}
	
	async deleteAccount(accountId: string): Promise<void> {
		await AccountModel.deleteOne({ _id: accountId })
	}

	static deserializeAccount(accountModel: IAccount): Account {
		if (!accountModel) {
			return null
		}
		
		return {
			id: accountModel._id,
			name: accountModel.name,
			colors: {
				primary: accountModel.colors.primary,
				secondary: accountModel.colors.secondary,
			},
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