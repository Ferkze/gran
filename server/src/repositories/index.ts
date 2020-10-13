import { User } from '../models/entities/User'
import { Category } from '../models/entities/Category'
import { Account } from '../models/entities/Account'
import MongooseRepository from './mongoose'
import { Institution } from '../models/entities/Institution'
import { Transaction, TransactionFilter } from '../models/entities/Transaction'
import { Group } from '../models/entities/Group'
import { Budget } from '../models/entities/Budget'
import { Planning, PlanningFilter } from '../models/entities/Planning'


export interface AccountRepository {
	getAllUserAccounts(userId: User['id']): Promise<Account[]>
	findAccountById(userId: User['id'], accountId: Account['id']): Promise<Account | null>
	saveAccount(userId: User['id'], account: Account): Promise<Account>
	updateAccount(userId: User['id'], accountId: Account['id'], data: Account): Promise<Account>
	deleteAccount(userId: User['id'], accountId: Account['id']): Promise<void>
	accountExists(userId: User['id'], accountId: Account['id']): Promise<boolean>
}

export interface PlanningRepository {
	getFilteredPlannings(filter: PlanningFilter): Promise<Planning[]>
	getUserPlannings(userId: User['id']): Promise<Planning[]>
	findUserPlanningById(userId: User['id'], planningId: Planning['id']): Promise<Planning | null>
	saveUserPlanning(userId: User['id'], planning: Planning): Promise<Planning>
	updateUserPlanning(userId: User['id'], planningId: Planning['id'], data: Planning): Promise<Planning>
	deleteUserPlanning(userId: User['id'], planningId: Planning['id']): Promise<void>
	planningExists(userId: User['id'], planningId: Account['id']): Promise<boolean>

	getGroupPlannings(groupId: Group['id']): Promise<Planning[]>
	findGroupPlanningById(groupId: Group['id'], planningId: Planning['id']): Promise<Planning | null>
	saveGroupPlanning(groupId: Group['id'], planning: Planning): Promise<Planning>
	updateGroupPlanning(groupId: Group['id'], planningId: Planning['id'], data: Planning): Promise<Planning>
	deleteGroupPlanning(groupId: Group['id'], planningId: Planning['id']): Promise<void>
}

export interface CategoryRepository {
	getAllCategories(): Promise<Category[]>
	findCategoryById(id: string): Promise<Category | null>
	saveCategory(category: Category): Promise<Category>
	updateCategory(categoryId: Category['id'], category: Category): Promise<Category>
	deleteCategory(categoryId: Category['id']): Promise<void>
}

export interface GroupRepository {
	getAllUserGroups(userId: User['id']): Promise<Group[]>
	findGroupById(groupId: Group['id']): Promise<Group | null>
	saveGroup(group: Group): Promise<Group>
	updateGroup(groupId: Group['id'], group: any): Promise<Group>
	deleteGroup(userId: User['id'], groupId: Group['id']): Promise<boolean>
}

export interface InstitutionRepository {
	getAllInstitutions(): Promise<Institution[]>
	findInstitutionById(id: string): Promise<Institution | null>
	saveInstitution(institution: Institution): Promise<Institution>
	updateInstitution(institution: Institution): Promise<Institution>
	deleteInstitution(institutionId: Institution['id']): Promise<void>
}

export interface TransactionRepository {
	getFilteredTransactions(filter: TransactionFilter): Promise<Transaction[]>
	getAllUserTransactions(userId: User['id']): Promise<Transaction[]>
	getAllAccountTransactions(userId: User['id'], accountId: Account['id']): Promise<Transaction[]>
	findTransactionById(id: string): Promise<Transaction | null>
	saveTransaction(transaction: Transaction): Promise<Transaction>
	updateTransaction(id: Transaction['id'], transaction: Transaction): Promise<Transaction>
	deleteTransaction(transactionId: Transaction['id']): Promise<void>
}

export interface UserRepository {
	getAllUsers(): Promise<User[]>
	findUserById(id: string): Promise<User | null>
	findUserByEmail(email: string): Promise<User | null>
	saveUser(user: User): Promise<User>
	updateUser(userId: User['id'], user: User): Promise<User>
	deleteUser(userId: User['id']): Promise<void>
}

export interface Repositories {
	account: AccountRepository
	planning: PlanningRepository
	group: GroupRepository
	category: CategoryRepository
	institution: InstitutionRepository
	user: UserRepository
	transaction: TransactionRepository
}

function repositoriesInstance(): Repositories {
	return MongooseRepository
}

export default repositoriesInstance()