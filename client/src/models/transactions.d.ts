import { ICategory } from './Category'
import { IAccount } from './account'

export interface ITransaction {
  amount?: number
  date?: Date
  account: IAccount
  category: ICategory
  type: TransactionType

  createdAt?: string
  updatedAt?: string
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  TRANSFERENCE = 'TRANSFERENCE'
}
