import Repositories from '../repositories'
import { UsecasesImpl } from './usecases'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { User } from '../models/entities/User'
import { Institution } from '../models/entities/Institution'

export interface Usecases {
	authUsecases: AuthUsecases
	accountUsecases: AccountUsecases
	budgetUsecases: BudgetUsecases
	budgetGroupUsecases: BudgetGroupUsecases
	categoryUsecases: CategoryUsecases
	instutionUsecases: InstitutionUsecases
	userUsecases: UserUsecases
	transactionUsecases: TransactionUsecases
}

export interface AccountUsecases {
	showBalance(): void
	listAccounts(): void
	registerAccount(): void
}

export interface AuthUsecases {
	login(data: LoginData): Promise<User>
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