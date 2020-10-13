import { Repositories } from '../repositories'
import { TransactionUsecases } from '.'
import { Transaction, TransactionFilter, TransactionType } from '../models/entities/Transaction'
import { ValidationError } from '../models/errors/ValidationError'
import { Balance } from '../models/entities/Balance'
import { User } from '../models/entities/User'
import { Account } from '../models/entities/Account'
import { Group } from '../models/entities/Group'

export class TransactionUsecasesImpl implements TransactionUsecases {
	
	constructor(private repo: Repositories) { }
	
	async editTransaction(id: string, data: Transaction): Promise<Transaction> {
		return await this.repo.transaction.updateTransaction(id, data)
	}

	async getFilteredTransactions(filter: TransactionFilter): Promise<Transaction[]> {
		return await this.repo.transaction.getFilteredTransactions(filter)
	}

	async listTransactionsByUser(userId: string, filter: TransactionFilter = {}): Promise<Transaction[]> {
		filter.user = userId
		return await this.repo.transaction.getFilteredTransactions(filter)
	}

	async listTransactionsByGroup(groupId: Group['id'], filter: TransactionFilter = {}): Promise<Transaction[]> {
		filter.group = groupId
		return await this.repo.transaction.getFilteredTransactions(filter)
	}

	async registerTransaction(data: Transaction): Promise<Transaction> {
		if (!data.amount) {
			throw new ValidationError('A transação precisa ter um valor')
		}
		return await this.repo.transaction.saveTransaction(data)
	}

	async getBalance(userId: User['id']): Promise<Balance> {
		const transactions = await this.repo.transaction.getAllUserTransactions(userId)
		const balance = this.calculateBalance(transactions)
		return balance
	}

	async getAccountBalance(userId: User['id'], accountId: Account['id']): Promise<Balance> {
		const account = await this.repo.account.findAccountById(userId, accountId)
		const transactions = await this.repo.transaction.getAllAccountTransactions(userId, accountId)
		const balance = this.calculateBalance(transactions, account.startingBalance)
		return balance
	}

	private calculateBalance(transactions: Transaction[], initial: number = 0): Balance {
		const transactionDates = transactions.map(t => t.date)
		const balance: Balance = {
			initial,
			balance: initial,
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
		balance.balance += balanceAmount
		return balance
	}
	
}