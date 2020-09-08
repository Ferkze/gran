import { User } from './User'

export interface BudgetGroup {
	id: string
  name: string
  description: string
  creator: User
  members: User[]
  createdAt: Date
  updatedAt: Date
}