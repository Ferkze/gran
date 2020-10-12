import { Planning } from './Planning';
import { User } from './User'

export interface Group {
  id?: any
  name: string
  creator: User
  members: User[]
  plannings: Planning[]
  createdAt?: Date
  updatedAt?: Date
}