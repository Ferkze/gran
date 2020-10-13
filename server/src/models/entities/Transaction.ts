import { User } from './User'
import { Category, CategoryType } from './Category'
import { Group } from './Group'
import { Account } from './Account'

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  TRANSFERENCE = 'transference',
}

export interface Transaction {
  id?: any
  amount: number
  date: Date
  description: string
  paid?: boolean
  type: TransactionType
  account: Account['id']
  category: Category['id']
  user: User['id']
  group?: Group['id']
  createdAt?: Date
  updatedAt?: Date
}

export interface TransactionFilter {
  id?: string
  start?: Date
  end?: Date
  paid?: boolean
  type?: TransactionType
  account?: Account['id']
  category?: CategoryType
  user?: User['id']
  group?: Group['id']

}