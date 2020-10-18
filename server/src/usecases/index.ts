import Repositories from '../repositories'
import { UsecasesImpl } from './usecases'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { User } from '../models/entities/User'
import { Institution } from '../models/entities/Institution'
import { Account } from '../models/entities/Account'
import { Category } from '../models/entities/Category'
import { Budget } from '../models/entities/Budget'
import { Group } from '../models/entities/Group'
import { Transaction, TransactionFilter } from '../models/entities/Transaction'
import { Balance } from '../models/entities/Balance'
import { Planning, PlanningFilter } from '../models/entities/Planning'

export interface Usecases {
	auth: AuthUsecases
	account: AccountUsecases
	budget: BudgetUsecases
	planning: PlanningUsecases
	group: GroupUsecases
	category: CategoryUsecases
	instution: InstitutionUsecases
	user: UserUsecases
	transaction: TransactionUsecases
}

export interface AccountUsecases {
	listAccountsByUser(userId: User['id']): Promise<Account[]>
	findAccountById(userId: User['id'], accountId: Account['id']): Promise<Account | null>
	deleteAccount(userId: User['id'], accountId: Account['id']):  Promise<void>
	editAccount(userId: User['id'], accountId: Account['id'], data: Account): Promise<Account>
	registerAccount(userId: User['id'], account: Account): Promise<Account>
	getAccountBalance(userId: User['id'], accountId: Account['id']): Promise<number>
}

export interface AuthUsecases {
	login(data: LoginData): Promise<User>
	logout(): void
	generateToken(user: User): string
	getUserFromToken(token: string): Promise<User | null>
	register(data: RegisterData): Promise<User>
}

export interface BudgetUsecases {
	editBudget(id:Budget['id'], data: Budget): Promise<Budget>
	listBudgetsByUser(userId: User['id']): Promise<Budget[]>
	registerBudget(data: Budget): Promise<Budget>
}

export interface PlanningUsecases {
	filterPlannings(filter: PlanningFilter): Promise<Planning[]>
	listPlanningsByUser(userId: User['id']): Promise<Planning[]>
	findPlanningById(userId: User['id'], planningId: Planning['id']): Promise<Planning | null>
	deletePlanning(userId: User['id'], planningId: Planning['id']):  Promise<void>
	editPlanning(userId: User['id'], planningId: Planning['id'], data: any): Promise<Planning>
	editGroupPlanning(groupId: Group['id'], planningId: Planning['id'], data: any): Promise<Planning>
	registerPlanning(userId: User['id'], planning: Planning): Promise<Planning>
	registerGroupPlanning(groupId: Group['id'], planning: Planning): Promise<Planning>
	addBudgetToPlanning(userId: User['id'], planningId: Planning['id'], data: Budget): Promise<Planning>
}

export interface CategoryUsecases {
	editCategory(id:Category['id'], data: Category): Promise<Category>
	listCategories(): Promise<Category[]>
	registerCategory(category: Category): Promise<Category>
}

export interface GroupUsecases {
	editGroup(groupId: Group['id'], data: any): Promise<Group>
	listGroups(userId: User['id']): Promise<Group[]>
	registerGroup(userId: User['id'], data: Group): Promise<Group>
	joinGroup(userId: User['id'], groupId: Group['id']): Promise<void>
	deleteGroup(userId: User['id'], groupId: Group['id']): Promise<boolean>
}

export interface InstitutionUsecases {
	listInstitutions(): Promise<Institution[]>
}

export interface TransactionUsecases {
	editTransaction(id:Transaction['id'], data: Transaction): Promise<Transaction>
	getFilteredTransactions(filter: TransactionFilter): Promise<Transaction[]>
	listTransactionsByUser(userId: User['id'], filter?: TransactionFilter): Promise<Transaction[]>
	listTransactionsByGroup(groupId: User['id'], filter?: TransactionFilter): Promise<Transaction[]>
	registerTransaction(data: Transaction): Promise<Transaction>
	getBalance(userId: User['id']): Promise<Balance>
	getAccountBalance(userId: User['id'], accountId: Account['id']): Promise<Balance>
	removeTransaction(userId: User['id'], accountId: Account['id']): Promise<boolean>
}

export interface UserUsecases {
	findByEmail(email: string): Promise<User | null>
	getUser(id: User['id']): Promise<User>
	editUser(id: User['id'], data: User): Promise<User>
	listUsers(): Promise<User[]>
}

export default new UsecasesImpl(Repositories)