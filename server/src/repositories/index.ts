import { User } from '../models/entities/User'
import { Category } from '../models/entities/Category'
import { Account } from '../models/entities/Account'
import MongooseRepository from './mongoose'
import { Institution } from '../models/entities/Institution'
import { Transaction } from '../models/entities/Transaction'
import { BudgetGroup } from '../models/entities/BudgetGroup'
import { Budget } from '../models/entities/Budget'

export interface UserRepositoryInterface {
	getAllUsers(): Promise<User[]>
	findUserById(id: string): Promise<User | null>
	findUserByEmail(email: string): Promise<User | null>
	saveUser(user: User): Promise<User>
	updateUser(user: User): Promise<User>
	deleteUser(userId: User['id']): Promise<void>
}

export interface AccountRepositoryInterface {
	getAllAccounts(): Promise<Account[]>
	getAllUserAccounts(userId: User['id']): Promise<Account[]>
	findAccountById(id: string): Promise<Account | null>
	saveAccount(account: Account): Promise<Account>
	updateAccount(account: Account): Promise<Account>
	deleteAccount(accountId: Account['id']): Promise<void>
}

export interface CategoryRepositoryInterface {
	getAllCategories(): Promise<Category[]>
	getAllUserCategories(userId: User['id']): Promise<Category[]>
	findCategoryById(id: string): Promise<Category | null>
	saveCategory(category: Category): Promise<Category>
	updateCategory(category: Category): Promise<Category>
	deleteCategory(categoryId: Category['id']): Promise<void>
}

export interface InstitutionRepositoryInterface {
	getAllInstitutions(): Promise<Institution[]>
	findInstitutionById(id: string): Promise<Institution | null>
	saveInstitution(institution: Institution): Promise<Institution>
	updateInstitution(institution: Institution): Promise<Institution>
	deleteInstitution(institutionId: Institution['id']): Promise<void>
}

export interface TransactionRepositoryInterface {
	getAllTransactions(): Promise<Transaction[]>
	getAllUserTransactions(userId: User['id']): Promise<Transaction[]>
	getAllAccountTransactions(accountId: Account['id']): Promise<Transaction[]>
	findTransactionById(id: string): Promise<Transaction | null>
	saveTransaction(transaction: Transaction): Promise<Transaction>
	updateTransaction(transaction: Transaction): Promise<Transaction>
	deleteTransaction(transactionId: Transaction['id']): Promise<void>
}

export interface BudgetRepositoryInterface {
	getAllBudgets(): Promise<Budget[]>
	getAllUserBudgets(userId: User['id']): Promise<Budget[]>
	findBudgetById(id: string): Promise<Budget | null>
	saveBudget(budget: Budget): Promise<Budget>
	updateBudget(budget: Budget): Promise<Budget>
	deleteBudget(budgetId: Budget['id']): Promise<void>
}

export interface BudgetGroupRepositoryInterface {
	getAllBudgetGroups(): Promise<BudgetGroup[]>
	getAllUserBudgetGroups(userId: User['id']): Promise<BudgetGroup[]>
	findBudgetGroupById(id: string): Promise<BudgetGroup | null>
	saveBudgetGroup(budgetGroup: BudgetGroup): Promise<BudgetGroup>
	updateBudgetGroup(budgetGroup: BudgetGroup): Promise<BudgetGroup>
	deleteBudgetGroup(budgetGroupId: BudgetGroup['id']): Promise<void>
}

export interface RepositoriesInterface {
  UserRepository: UserRepositoryInterface
}

function repositoriesInstance(): RepositoriesInterface {
	return MongooseRepository
}

export default repositoriesInstance()