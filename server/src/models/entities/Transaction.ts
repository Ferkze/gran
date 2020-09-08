import { User } from './User'
import { Category } from './Category'
import { BudgetGroup } from './BudgetGroup'

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  TRANSFERENCE = 'transference',
}

export interface Transaction {
	id: string
  amount: number
  date: Date
  description: string
  debitAccount: Account
  creditAccount: Account
  categories: Category[]
  type: TransactionType
  creator: User
  budgetGroup: BudgetGroup
  createdAt: Date
  updatedAt: Date
}