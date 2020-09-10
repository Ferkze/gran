import { Repositories } from '../repositories'
import { TransactionUsecases } from '.'

export class TransactionUsecasesImpl implements TransactionUsecases {
	
	constructor(private repo: Repositories) { }
	
	listTransactions(): void {
		throw new Error('Method not implemented.')
	}
	registerTransaction(): void {
		throw new Error('Method not implemented.')
	}
	
}