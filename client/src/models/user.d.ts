import { IAccount } from './Account'

export interface User {
  _id: string
  email?: string
  firstName?: string
  lastName?: string
  accounts?: IAccount[]
  createdAt?: string
  updatedAt?: string
}
