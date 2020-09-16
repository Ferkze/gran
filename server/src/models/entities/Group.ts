import { User } from './User'

export interface Group {
	id: string
  name: string
  description: string
  creator: User
  members: User[]
  createdAt: Date
  updatedAt: Date
}