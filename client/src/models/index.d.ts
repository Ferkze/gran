import { AccountTypes, AccountSubtypes, TransactionType } from './enums'

export interface User {
  _id: string
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  accounts?: IAccount[]
  createdAt?: string
  updatedAt?: string
}

export interface IAccount {
  _id?: string
  name?: string
  main?: boolean
  institution?: string
  unregisteredInstitution?: string
  type?: AccountTypes
  subtype?: AccountSubtypes
  startingBalance?: number
  owner?: string
  createdAt?: string
  updatedAt?: string
}

export interface ICategory {
  name?: string

  createdAt?: string
  updatedAt?: string
}

export interface ITransaction {
  _id?: string
  amount?: number
  date?: Date
  description?: string
  debitAccount?: IAccount
  creditAccount?: IAccount
  category: ICategory
  type: TransactionType
  creator: User['_id']
  createdAt?: string
  updatedAt?: string
}

export interface AppStatus {
  code?: string
  message?: string
  type?: string
}
