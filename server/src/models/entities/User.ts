import { Account } from './Account'
import { Planning } from './Planning'

export interface User {
  id?: any
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  accounts: Account[]
  plannings: Planning[]
  createdAt: Date
  updatedAt: Date
}
