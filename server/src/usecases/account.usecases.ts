import { Repositories } from '../repositories'
import { AccountUsecases } from '.'
import { Account } from '../models/entities/Account'

export class AccountUsecasesImpl implements AccountUsecases {
	
	constructor(private repo: Repositories) { }
	
	showBalance(): void {
		throw new Error('Method not implemented.')
	}
	async listAccounts(): Promise<Account[]> {
		return await this.repo.account.getAllAccounts()
	}
	registerAccount(): void {
		throw new Error('Method not implemented.')
	}

	
}