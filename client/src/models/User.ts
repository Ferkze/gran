import {Account} from './Account'

export interface IUser {
    email ?: string
    firstName ?: string
    lastName ?: string
    accounts?: Account[]
    createdAt?: string
    updatedAt?: string
}

export class UserDTO implements IUser {
    email ?: string = ''
    firstName ?: string  = ''
    lastName ?: string  = ''
    accounts?: Account[] = []
    createdAt?: string  = new Date().toISOString()
    updatedAt?: string  = new Date().toISOString()
}

export class User extends UserDTO {
  constructor(dto: UserDTO) {
    super()
    Object.assign(this, dto)
  }

  get fullname(): string {
    return `${this.firstName} ${this.lastName}`
  }
}