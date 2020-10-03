import { Repositories } from '../repositories'
import { TransactionUsecases } from '.'
import { Transaction, TransactionType } from '../models/entities/Transaction'
import { ValidationError } from '../models/errors/ValidationError'
import { Balance } from '../models/entities/Balance'
import { User } from '../models/entities/User'

export class TransactionUsecasesImpl implements TransactionUsecases {
	
	constructor(private repo: Repositories) { }
	
	async editTransaction(id: string, data: Transaction): Promise<Transaction> {
		return await this.repo.transaction.updateTransaction(id, data)
	}
	async listTransactionsByUser(userId: string): Promise<Transaction[]> {
		return await this.repo.transaction.getAllUserTransactions(userId)
	}
	async registerTransaction(data: Transaction): Promise<Transaction> {
		if (!data.amount) {
			throw new ValidationError('A transação precisa ter um valor')
		}
		return await this.repo.transaction.saveTransaction(data)
	}

	async getBalance(userId: User['id']): Promise<Balance> {
		const transactions = await this.repo.transaction.getAllUserTransactions(userId)
		const balance = this.sumTransactions(transactions)
		return balance
	}

	sumTransactions(transactions: Transaction[]): Balance {
		const transactionDates = transactions.map(t => t.date)
		const balance: Balance = {
			balance: 0,
			credits: 0,
			debits: 0,
			finish: transactionDates.reduce((a, b) => a > b ? a : b),
			start: transactionDates.reduce((a, b) => a < b ? a : b)
		}
		const balanceAmount = transactions.reduce((acc, cur) => {
			if (cur.type == TransactionType.DEBIT || cur.type == TransactionType.TRANSFERENCE) {
				balance.debits += cur.amount
				return acc + cur.amount
			}
			balance.credits += cur.amount
			return acc - cur.amount
		}, 0)
		balance.balance = balanceAmount
		return balance
	}
	
}