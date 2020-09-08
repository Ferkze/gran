import { User } from './User'

enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface Category {
	id: string
  name: string
  creator: User
  type: CategoryType
  colors: {
    primary: string
    secondary: string
  }
  createdAt: Date
  updatedAt: Date
}