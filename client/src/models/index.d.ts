import { AccountTypes, AccountSubtypes, TransactionType, InstitutionType, CategoryType } from './enums'

export interface User {
  _id: string
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  accounts?: Account[] | Account['_id'][]
  createdAt?: string
  updatedAt?: string
}

export interface Account {
  _id?: string
  name: string
  color?: {
    primary: string
    secondary: string
  }
  main: boolean
  institution?: Institution | Institution['_id']
  unregisteredInstitution?: string
  type: AccountTypes
  subtype?: AccountSubtypes
  startingBalance?: number
  owner?: string
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  _id: string
  name?: string
  type?: CategoryType
  colors?: {
    primary?: string
    secondary?: string
  }
  creator?: User | User['_id']
  createdAt?: string
  updatedAt?: string
}

export interface Transaction {
  _id?: string
  amount?: number
  date?: Date | string
  description?: string
  debitAccount?: Account
  creditAccount?: Account
  categories: Category[]
  type: TransactionType
  creator?: User | User['_id']
  budgetGroup?: BudgetGroup | BudgetGroup['_id']
  createdAt?: string
  updatedAt?: string
}

export interface BudgetGroup {
  _id: string
  name: string
  description?: string
  creator?: User | User['_id']
  members?: User[] | User['_id']

  createdAt?: Date
  updatedAt?: Date
}

export interface Institution {
  _id: string
  name?: string
  description?: string
  type?: InstitutionType
  colors?: {
    primary: string
    secondary?: string
  }
  logoURL?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface AppStatus {
  code?: string
  message?: string
  type?: string
}
