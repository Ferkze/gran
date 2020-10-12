import { Repositories } from '../repositories'
import { AccountUsecases } from '.'
import { Account } from '../models/entities/Account'
import { TransactionType } from '../models/entities/Transaction'
import { ValidationError } from '../models/errors/ValidationError'
import { UsecaseError } from '../models/errors/UsecaseError'
import { User } from '../models/entities/User'

export class AccountUsecasesImpl implements AccountUsecases {
	
	constructor(private repo: Repositories) { }
	
	async getAccountBalance(userId: User['id'], accountId: Account['id']): Promise<number> {
		const exists = await this.repo.account.accountExists(userId, accountId)
		if (!exists) {
			throw new ValidationError('Conta não existe')
		}
		const account = await this.repo.account.findAccountById(userId, accountId)
		const transactions = await this.repo.transaction.getAllAccountTransactions(accountId)
		const balance = transactions.reduce((acc, cur) => {
			if (cur.type == TransactionType.DEBIT || cur.type == TransactionType.TRANSFERENCE) {
				return acc + cur.amount
			}
			return acc - cur.amount
		}, 0)
		return balance + account.startingBalance
	}

	async listAccountsByUser(userId: string): Promise<Account[]> {
		return this.repo.account.getAllUserAccounts(userId)
	}

	async findAccountById(userId: User['id'], accountId: Account['id']): Promise<Account | null> {
		return this.repo.account.findAccountById(userId, accountId)
	}

	async deleteAccount(userId: User['id'], accountId: Account['id']):  Promise<void> {
		if (!this.repo.account.accountExists(userId, accountId)) {
			throw new UsecaseError('Conta não existe')
		}
		return await this.repo.account.deleteAccount(userId, accountId)
	}

	async editAccount(userId: User['id'], accountId: Account['id'], data: Account): Promise<Account> {
		return await this.repo.account.updateAccount(userId, accountId, data)
	}

	async registerAccount(userId: User['id'], account: Account): Promise<Account> {
		return await this.repo.account.saveAccount(userId, account)
	}

}