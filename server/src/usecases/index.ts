import Repositories from '../repositories'
import { UsecasesImpl } from './usecases'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { User } from '../models/entities/User'
import { Institution } from '../models/entities/Institution'
import { Account } from '../models/entities/Account'
import { Category } from '../models/entities/Category'
import { Budget } from '../models/entities/Budget'
import { Group } from '../models/entities/Group'
import { Transaction } from '../models/entities/Transaction'

export interface Usecases {
	auth: AuthUsecases
	account: AccountUsecases
	budget: BudgetUsecases
	group: GroupUsecases
	category: CategoryUsecases
	instution: InstitutionUsecases
	user: UserUsecases
	transaction: TransactionUsecases
}

export interface AccountUsecases {
	showBalance(): void
	listAccounts(): Promise<Account[]>
	findAccountById(id: Account['id']): Promise<Account | null>
	deleteAccount(id: Account['id']):  Promise<void>
	editAccount(account: Account): Promise<Account>
	registerAccount(account: Account): Promise<Account>
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

export interface CategoryUsecases {
	editCategory(id:Category['id'], data: Category): Promise<Category>
	listCategories(userId: User['id']): Promise<Category[]>
	registerCategory(category: Category): Promise<Category>
}

export interface GroupUsecases {
	editGroup(id:Group['id'], data: Group): Promise<Group>
	listGroups(userId: User['id']): Promise<Group[]>
	registerGroup(data: Group): Promise<Group>
	joinGroup(userId: User['id'], groupId: Group['id']): Promise<void>
}

export interface InstitutionUsecases {
	listInstitutions(): Promise<Institution[]>
}

export interface TransactionUsecases {
	editTransaction(id:Transaction['id'], data: Transaction): Promise<Transaction>
	listTransactionsByUser(userId: User['id']): Promise<Transaction[]>
	registerTransaction(data: Transaction): Promise<Transaction>
}

export interface UserUsecases {
	getUser(id: User['id']): Promise<User>
	editUser(id: User['id'], data: User): Promise<User>
	listUsers(): Promise<User[]>
}

export default new UsecasesImpl(Repositories)