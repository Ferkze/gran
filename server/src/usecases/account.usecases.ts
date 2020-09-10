import { Repositories } from '../repositories'
import { AccountUsecases } from '.'

export class AccountUsecasesImpl implements AccountUsecases {
	
	constructor(private repo: Repositories) { }
	
	showBalance(): void {
		throw new Error('Method not implemented.')
	}
	listAccounts(): void {
		throw new Error('Method not implemented.')
	}
	registerAccount(): void {
		throw new Error('Method not implemented.')
	}

	
}