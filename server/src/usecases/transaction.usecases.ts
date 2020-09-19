import { Repositories } from '../repositories'
import { TransactionUsecases } from '.'
import { Transaction } from '../models/entities/Transaction'
import { ValidationError } from '../models/errors/ValidationError';

export class TransactionUsecasesImpl implements TransactionUsecases {
	
	constructor(private repo: Repositories) { }
	
	async editTransaction(id: string, data: Transaction): Promise<Transaction> {
		return await this.repo.transaction.updateTransaction(id, data)
	}
	async listTransactionsByUser(userId: string): Promise<Transaction[]> {
		return await this.repo.transaction.getAllUserTransactions(userId);
	}
	async registerTransaction(data: Transaction): Promise<Transaction> {
		if (!data.amount) {
			throw new ValidationError('A transação precisa ter um valor')
		}
		return await this.repo.transaction.saveTransaction(data)
	}
	
}