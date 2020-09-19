import { User } from "./User";

export interface Budget {
	id: string
  name: string
  description: string
  creator: User['id']
  members: User[]
  createdAt: Date
  updatedAt: Date
}