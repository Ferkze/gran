import { Repositories } from '../repositories'
import { AccountUsecases } from '.'
import { Account } from '../models/entities/Account'
import { TransactionType } from '../models/entities/Transaction'
import { ValidationError } from '../models/errors/ValidationError'

export class AccountUsecasesImpl implements AccountUsecases {
	
	constructor(private repo: Repositories) { }
	
	async getAccountBalance(accountId: Account['id']): Promise<number> {
		const exists = await this.repo.account.accountExists(accountId)
		if (!exists) {
			throw new ValidationError('Conta não existe')
		}
		const transactions = await this.repo.transaction.getAllAccountTransactions(accountId)
		const balance = transactions.reduce((acc, cur) => {
			if (cur.type == TransactionType.DEBIT || cur.type == TransactionType.TRANSFERENCE) {
				return acc + cur.amount
			}
			return acc - cur.amount
		}, 0)
		return balance
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