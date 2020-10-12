export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFERENCE = 'transference'
}

export interface Category {
  id?: any
  icon: string
  name: string
  type: CategoryType
  createdAt?: Date
  updatedAt?: Date
}