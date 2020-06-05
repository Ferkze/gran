import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../../service/api/account'
import auth from './auth'
import { CategoryType, InstitutionType } from '../../models/enums'

import { Account, Transaction, Category, Institution } from '@/models'
import {
	getUserTransactions,
	updateTransaction,
	deleteTransaction,
	createTransaction
} from '@/service/api/transactions'
import { getInstitutions } from '@/service/api/institution'
import { getCategories } from '@/service/api/categories'

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
		return this.accounts.map(a => a._id)
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
		if (!auth.user || !auth.user._id) {
			return []
		}
		return (await getInstitutions()).data
	}

	@Action({ commit: 'setCategories', rawError: true })
	async fetchCategories(): Promise<Category[] | null> {
		if (!auth.user || !auth.user._id) {
			return []
		}
		return (await getCategories()).data
	}

	@Action({ commit: 'setAccounts', rawError: true })
	async fetchAccounts(): Promise<Account[] | null> {
		if (!auth.user || !auth.user._id) {
			return []
		}
		return (await getAccounts(auth.user._id)).data
	}

	@Action({ commit: 'addAccount', rawError: true })
	async newAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user._id) {
			return null
		}
		account.owner = auth.user._id
		return (await createAccount(auth.user._id, account)).data
	}

	@Action({ commit: 'replaceAccount', rawError: true })
	async changeAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user._id) {
			return null
		}
		return (await updateAccount(auth.user._id, account)).data
	}

	@Action({ commit: 'removeAccount', rawError: true })
	async deleteAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user._id || !account._id) {
			return null
		}
		return (await deleteAccount(account._id)).data
	}

	@Action({ commit: 'setTransactions', rawError: true })
	async fetchTransactions(): Promise<Transaction[] | null> {
		if (!auth.user || !auth.user._id) {
			return []
		}
		return (await getUserTransactions(auth.user._id)).data
	}

	@Action({ commit: 'addTransaction', rawError: true })
	async newTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user._id) {
			return null
		}
		transaction.creator = auth.user._id
		return (await createTransaction(transaction)).data
	}

	@Action({ commit: 'replaceTransaction', rawError: true })
	async changeTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user._id) {
			return null
		}
		return (await updateTransaction(transaction)).data
	}

	@Action({ commit: 'removeTransaction', rawError: true })
	async deleteTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user._id || !transaction._id) {
			return null
		}
		await deleteTransaction(transaction._id)
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
		const index = this.accounts.findIndex(a => a._id == account._id)
		this.accounts.splice(index, 1, account)
	}

	@Mutation
	removeAccount(account: Account) {
		const index = this.accounts.findIndex(a => a._id == account._id)
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
		const index = this.transactions.findIndex(a => a._id == transaction._id)
		this.transactions.splice(index, 1, transaction)
	}

	@Mutation
	removeTransaction(transaction: Transaction) {
		const index = this.transactions.findIndex(a => a._id == transaction._id)
		this.transactions.splice(index, 1)
	}
}

export default getModule(FinancesModule)
