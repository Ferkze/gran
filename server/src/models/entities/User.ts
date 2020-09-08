import { Budget } from './Budget'
import { Account } from './Account'

export interface User {
  id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  accounts: Account[]
  budgets: Budget[]
  createdAt: number
  updatedAt: number
}
