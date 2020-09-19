import { User } from '../models/entities/User'
import { Category } from '../models/entities/Category'
import { Account } from '../models/entities/Account'
import MongooseRepository from './mongoose'
import { Institution } from '../models/entities/Institution'
import { Transaction } from '../models/entities/Transaction'
import { Group } from '../models/entities/Group'
import { Budget } from '../models/entities/Budget'


export interface AccountRepository {
	getAllAccounts(): Promise<Account[]>
	getAllUserAccounts(userId: User['id']): Promise<Account[]>
	findAccountById(id: string): Promise<Account | null>
	saveAccount(account: Account): Promise<Account>
	updateAccount(account: Account): Promise<Account>
	deleteAccount(accountId: Account['id']): Promise<void>
}

export interface BudgetRepository {
	getAllBudgets(): Promise<Budget[]>
	getAllUserBudgets(userId: User['id']): Promise<Budget[]>
	findBudgetById(id: string): Promise<Budget | null>
	saveBudget(budget: Budget): Promise<Budget>
	updateBudget(budgetId: Budget['id'], budget: Budget): Promise<Budget>
	deleteBudget(budgetId: Budget['id']): Promise<void>
}

export interface CategoryRepository {
	getAllCategories(): Promise<Category[]>
	getAllUserCategories(userId: User['id']): Promise<Category[]>
	findCategoryById(id: string): Promise<Category | null>
	saveCategory(category: Category): Promise<Category>
	updateCategory(categoryId: Category['id'], category: Category): Promise<Category>
	deleteCategory(categoryId: Category['id']): Promise<void>
}

export interface GroupRepository {
	getAllGroups(): Promise<Group[]>
	getAllUserGroups(userId: User['id']): Promise<Group[]>
	findGroupById(id: string): Promise<Group | null>
	saveGroup(group: Group): Promise<Group>
	updateGroup(group: Group): Promise<Group>
	deleteGroup(groupId: Group['id']): Promise<void>
}

export interface InstitutionRepository {
	getAllInstitutions(): Promise<Institution[]>
	findInstitutionById(id: string): Promise<Institution | null>
	saveInstitution(institution: Institution): Promise<Institution>
	updateInstitution(institution: Institution): Promise<Institution>
	deleteInstitution(institutionId: Institution['id']): Promise<void>
}

export interface TransactionRepository {
	getAllTransactions(): Promise<Transaction[]>
	getAllUserTransactions(userId: User['id']): Promise<Transaction[]>
	getAllAccountTransactions(accountId: Account['id']): Promise<Transaction[]>
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
	budget: BudgetRepository
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