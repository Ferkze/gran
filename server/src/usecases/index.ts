import Repositories from '../repositories'
import { UsecasesImpl } from './usecases'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { User } from '../models/entities/User'
import { Institution } from '../models/entities/Institution'
import { Account } from '../models/entities/Account'

export interface Usecases {
	auth: AuthUsecases
	account: AccountUsecases
	budget: BudgetUsecases
	budgetGroup: BudgetGroupUsecases
	category: CategoryUsecases
	instution: InstitutionUsecases
	user: UserUsecases
	transaction: TransactionUsecases
}

export interface AccountUsecases {
	showBalance(): void
	listAccounts(): Promise<Account[]>
	registerAccount(): void
}

export interface AuthUsecases {
	login(data: LoginData): Promise<User>
	generateToken(user: User): string
	register(data: RegisterData): Promise<User>
	logout(): void
}

export interface BudgetUsecases {
	listBudgets(): void
	registerBudget(): void
}

export interface BudgetGroupUsecases {
	listBudgetGroups(): void
	registerBudgetGroup(): void
	joinBudgetGroup(): void
}

export interface CategoryUsecases {
	listCategories(): void
	registerCategory(): void
}

export interface InstitutionUsecases {
	listInstitutions(): Promise<Institution[]>
}

export interface TransactionUsecases {
	listTransactions(): void
	registerTransaction(): void
}

export interface UserUsecases {
	listUsers(): Promise<User[]>
}

export default new UsecasesImpl(Repositories)