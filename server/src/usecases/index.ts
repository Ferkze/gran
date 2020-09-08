import Repositories from '../repositories'
import { UsecasesImpl } from './usecases'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { User } from '../models/entities/User'

export interface Usecases {
	login(data: LoginData): Promise<User>
	register(data: RegisterData): Promise<User>
	logout(): void

	showBalance(): void

	listUsers(): Promise<User[]>
	listAccounts(): void
	listTransactions(): void
	listInstitutions(): void
	listCategories(): void
	listBudgets(): void
	listBudgetGroups(): void

	registerAccount(): void
	registerTransaction(): void
	registerCategory(): void
	registerBudget(): void
	registerBudgetGroup(): void

	joinBudgetGroup(): void
}

export default new UsecasesImpl(Repositories)