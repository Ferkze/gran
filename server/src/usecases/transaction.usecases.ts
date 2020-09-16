import { Repositories } from '../repositories'
import { TransactionUsecases } from '.'
import { Transaction } from '../models/entities/Transaction'

export class TransactionUsecasesImpl implements TransactionUsecases {
	
	constructor(private repo: Repositories) { }
	
	editTransaction(id: string, data: Transaction): Promise<Transaction> {
		throw new Error('Method not implemented.')
	}
	listTransactionsByUser(userId: string): Promise<Transaction[]> {
		throw new Error('Method not implemented.')
	}
	registerTransaction(data: Transaction): Promise<Transaction> {
		if (!data.amount) {
			throw new Error('A transação precisa ter um valor')
		}
		throw new Error('Method not implemented.')
	}
	
}