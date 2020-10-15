import { Repositories } from '../repositories'
import { TransactionUsecases } from '.'
import { Transaction, TransactionFilter, TransactionType } from '../models/entities/Transaction'
import { ValidationError } from '../models/errors/ValidationError'
import { Balance } from '../models/entities/Balance'
import { User } from '../models/entities/User'
import { Account } from '../models/entities/Account'
import { Group } from '../models/entities/Group'
import debug from 'debug'
import moment from 'moment'

const log = debug('app:transaction:usecase:')

export class TransactionUsecasesImpl implements TransactionUsecases {
	
	constructor(private repo: Repositories) { }
	
	async editTransaction(id: string, data: Transaction): Promise<Transaction> {
		return await this.repo.transaction.updateTransaction(id, data)
	}

	async getFilteredTransactions(filter: TransactionFilter): Promise<Transaction[]> {
		filter = this.convertMonthYearToStartEnd(filter)
		return await this.repo.transaction.getFilteredTransactions(filter)
	}

	async listTransactionsByUser(userId: string, filter: TransactionFilter = {}): Promise<Transaction[]> {
		filter = this.convertMonthYearToStartEnd(filter)
		filter.user = userId
		return await this.repo.transaction.getFilteredTransactions(filter)
	}

	async listTransactionsByGroup(groupId: Group['id'], filter: TransactionFilter = {}): Promise<Transaction[]> {
		filter = this.convertMonthYearToStartEnd(filter)
		filter.group = groupId
		return await this.repo.transaction.getFilteredTransactions(filter)
	}

	async registerTransaction(data: Transaction): Promise<Transaction> {
		if (!data.amount) {
			throw new ValidationError('A transação precisa ter um valor')
		}
		if (data.type == TransactionType.TRANSFERENCE) {
			log('Nova transferência')
		}
		return await this.repo.transaction.saveTransaction(data)
	}

	async getBalance(filter: TransactionFilter): Promise<Balance> {
		filter = this.convertMonthYearToStartEnd(filter)
		const transactions = await this.repo.transaction.getFilteredTransactions(filter)
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
		if (!transactions.length) {
			return {
				initial,
				balance: initial,
				credits: 0,
				debits: 0,
				finish: null,
				start: null
			}
		}
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

	async removeTransaction(userId: User['id'], transactionId: Transaction['id']): Promise<boolean> {
		return await this.repo.transaction.deleteTransaction(userId, transactionId)
	}

	private convertMonthYearToStartEnd(filter: TransactionFilter): TransactionFilter {
		if (filter.month && filter.year) {
			const date = moment(`${filter.month.toString().padStart(2, '0')}-${filter.year}`, "MM-YYYY")
			filter.start = date.startOf('month').toDate()
			filter.end = date.endOf('month').toDate()
		}
		return filter
	}
	
}