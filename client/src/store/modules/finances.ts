import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import auth from './auth'
import { CategoryType, InstitutionType } from '@/models/enums'
import { Transaction, Category, Institution } from '@/models'
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
	transactions: Transaction[] = []
	categories: Category[] = []
	institutions: Institution[] = []

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

	@Action
	async load() {
		await Promise.all([
			this.fetchCategories(),
			this.fetchInstitutions()
		])
		return
	}

	@Action({ commit: 'setInstitutions', rawError: true })
	async fetchInstitutions(): Promise<Institution[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await InstitutionService.getInstitutions()
	}

	@Action({ commit: 'setCategories', rawError: true })
	async fetchCategories(): Promise<Category[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await CategoryService.getCategories()
	}

	@Action({ commit: 'setTransactions', rawError: true })
	async fetchTransactions(): Promise<Transaction[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await TransactionService.getUserTransactions()
	}

	@Action({ commit: 'addTransaction', rawError: true })
	async newTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		transaction.user = auth.user.id
		transaction = await TransactionService.createTransaction(transaction)
		console.log(`Transação de id ${transaction.id} criada com sucesso`)
		return transaction
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
