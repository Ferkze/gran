import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import AccountService from '@/service/api/AccountService'
import auth from './auth'
import { CategoryType, InstitutionType } from '@/models/enums'

import { Account, Transaction, Category, Institution } from '@/models'
import TransactionService from '@/service/api/TransactionService'
import InstitutionService from '@/service/api/InstitutionService'
import CategoryService from '@/service/api/CategoryService'

@Module({
	store,
	dynamic: true,
	namespaced: true,
	name: 'finances'
})
class FinancesModule extends VuexModule {
	accounts: Account[] = []
	transactions: Transaction[] = []
	categories: Category[] = []
	institutions: Institution[] = []

	get accountIds() {
		return this.accounts.map(a => a.id)
	}

	get bankInstitutions() {
		return this.institutions.filter(i => i.type == InstitutionType.BANK)
	}

	get brokerInstitutions() {
		return this.institutions.filter(i => i.type == InstitutionType.BROKER)
	}

	get paymentInstitutions() {
		return this.institutions.filter(i => i.type == InstitutionType.PAYMENT_INSTITUTION)
	}

	get expenseCategories() {
		return this.categories.filter(c => c.type == CategoryType.EXPENSE)
	}

	get incomeCategories() {
		return this.categories.filter(c => c.type == CategoryType.INCOME)
	}

	@Action({ commit: 'setInstitutions', rawError: true })
	async fetchInstitutions(): Promise<Institution[] | null> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return (await InstitutionService.getInstitutions()).data
	}

	@Action({ commit: 'setCategories', rawError: true })
	async fetchCategories(): Promise<Category[] | null> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return (await CategoryService.getCategories()).data
	}

	@Action({ commit: 'setAccounts', rawError: true })
	async fetchAccounts(): Promise<Account[] | null> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return (await AccountService.getAccounts(auth.user.id)).data
	}

	@Action({ commit: 'addAccount', rawError: true })
	async newAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		account.owner = auth.user.id
		return (await AccountService.createAccount(auth.user.id, account)).data
	}

	@Action({ commit: 'replaceAccount', rawError: true })
	async changeAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return (await AccountService.updateAccount(auth.user.id, account)).data
	}

	@Action({ commit: 'removeAccount', rawError: true })
	async deleteAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user.id || !account.id) {
			return null
		}
		return (await AccountService.deleteAccount(account.id)).data
	}

	@Action({ commit: 'setTransactions', rawError: true })
	async fetchTransactions(): Promise<Transaction[] | null> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return (await TransactionService.getUserTransactions(auth.user.id)).data
	}

	@Action({ commit: 'addTransaction', rawError: true })
	async newTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		transaction.creator = auth.user.id
		return (await TransactionService.createTransaction(transaction)).data
	}

	@Action({ commit: 'replaceTransaction', rawError: true })
	async changeTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return (await TransactionService.updateTransaction(transaction)).data
	}

	@Action({ commit: 'removeTransaction', rawError: true })
	async deleteTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user.id || !transaction.id) {
			return null
		}
		await TransactionService.deleteTransaction(transaction.id)
		return transaction
	}

	@Mutation
	setInstitutions(institutions: Institution[]) {
		this.institutions = institutions
	}

	@Mutation
	setCategories(categories: Category[]) {
		this.categories = categories
	}

	@Mutation
	setAccounts(accounts: Account[]) {
		this.accounts = accounts
	}

	@Mutation
	addAccount(account: Account) {
		this.accounts.push(account)
	}

	@Mutation
	replaceAccount(account: Account) {
		const index = this.accounts.findIndex(a => a.id == account.id)
		this.accounts.splice(index, 1, account)
	}

	@Mutation
	removeAccount(account: Account) {
		const index = this.accounts.findIndex(a => a.id == account.id)
		this.accounts.splice(index, 1)
	}

	@Mutation
	setTransactions(transactions: Transaction[]) {
		this.transactions = transactions
	}

	@Mutation
	addTransaction(transaction: Transaction) {
		this.transactions.push(transaction)
	}

	@Mutation
	replaceTransaction(transaction: Transaction) {
		const index = this.transactions.findIndex(a => a.id == transaction.id)
		this.transactions.splice(index, 1, transaction)
	}

	@Mutation
	removeTransaction(transaction: Transaction) {
		const index = this.transactions.findIndex(a => a.id == transaction.id)
		this.transactions.splice(index, 1)
	}
}

export default getModule(FinancesModule)
