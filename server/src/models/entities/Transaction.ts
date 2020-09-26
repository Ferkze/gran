import { User } from './User'
import { Category } from './Category'
import { Group } from './Group'
import { Account } from './Account'

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
  paid: boolean
  type: TransactionType
  account: Account['id']
  category: Category['id']
  user: User['id']
  // group: Group['id']
  createdAt: Date
  updatedAt: Date
}