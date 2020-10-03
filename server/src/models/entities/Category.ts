export enum CategoryType {
  INCOME = 'renda',
  EXPENSE = 'gasto'
}

export interface Category {
	id: string
  name: string
  type: CategoryType
  createdAt: Date
  updatedAt: Date
}