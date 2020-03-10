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
    id?: number;
    avatar: string = '';
    email: string = '';
    first_name: string = '';
    last_name: string = '';
}

export class User extends UserDTO {
  constructor(dto: UserDTO) {
    super()
    Object.assign(this, dto)
  }
}