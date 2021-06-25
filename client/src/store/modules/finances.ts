import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import auth from './auth'
import { CategoryType, InstitutionType } from '@/models/enums'
import { Transaction, Category, Institution, TransactionFilter } from '@/models'
import TransactionService from '@/service/api/TransactionService'
import InstitutionService from '@/service/api/InstitutionService'
import CategoryService from '@/service/api/CategoryService'
import status from './status'

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
		try {
			console.log('test', this.institutions);
			
			await Promise.all([
				this.fetchCategories(),
				await this.fetchInstitutions()
			])
		} catch (error) {
			console.error('Erro no carregamento de dados financeiros', error)
		}
		return
	}

	@Action({ commit: 'setInstitutions', rawError: true })
	async fetchInstitutions(): Promise<Institution[]> {
		console.log('fetching ins')
		if (!auth.user || !auth.user.id) {
			return []
		}
		const institutions = await InstitutionService.getInstitutions()		
		return institutions
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

	@Action({ commit: 'setTransactions', rawError: true })
	async filterTransactions(filter:TransactionFilter): Promise<Transaction[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await TransactionService.getTransactions(filter)
	}

	@Action({ commit: 'addTransaction', rawError: true })
	async newTransaction(transaction: Transaction): Promise<Transaction | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		transaction.user = auth.user.id
		transaction = await TransactionService.createTransaction(transaction)
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
		try {
			if (!auth.user || !auth.user.id || !transaction.id) {
				return null
			}
			await TransactionService.deleteTransaction(transaction.id)
			return transaction
		} catch (error) {
			console.log('Erro ao excluir a transação', error)
			status.setStatus({
				message: 'Erro ao excluir a transação',
				type: 'error'
			})
			return null
		}
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
