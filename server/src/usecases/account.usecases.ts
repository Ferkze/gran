import { Repositories } from '../repositories'
import { AccountUsecases } from '.'
import { Account } from '../models/entities/Account'

export class AccountUsecasesImpl implements AccountUsecases {
	
	constructor(private repo: Repositories) { }
	
	showBalance(): void {
		throw new Error('Method not implemented.')
	}

	async listAccountsByUser(userId: string): Promise<Account[]> {
		return this.repo.account.getAllUserAccounts(userId)
	}

	async findAccountById(id: Account['id']): Promise<Account | null> {
		return this.repo.account.findAccountById(id)
	}

	async deleteAccount(id: Account['id']):  Promise<void> {
		return await this.repo.account.deleteAccount(id)
	}

	async editAccount(account: Account): Promise<Account> {
		return await this.repo.account.updateAccount(account)
	}

	async registerAccount(account: Account): Promise<Account> {
		return await this.repo.account.saveAccount(account)
	}

	
}