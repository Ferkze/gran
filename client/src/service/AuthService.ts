import client from './api/index'
import { IUser, User } from '@/models/User'
import { Token, saveToken, retrieveToken, deleteToken } from './TokenService'

export interface LoginData {
  email: string
  password?: string
}

export interface RegisterData {
  username?: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  accounts?: Account[]
  createdAt?: string
  updatedAt?: string
}

const resource = '/auth'

export const login = async (payload: LoginData): Promise<User> => {
  let user = _lastUser(payload.email)
  if (user !== null) {
    return new User(user)
  }
  const path = `${resource}/login`
  const response = await client.post<IUser>(path, payload)
  user = response.data
  const userToken = JSON.stringify(user) as Token
  saveToken(userToken, 'user_token')
  return new User(user)
}

export const register = async (payload: RegisterData): Promise<User> => {
  const path = `${resource}/register`
  const response = await client.post<IUser>(path, payload)
  return new User(response.data)
}

const _lastUser = (email: string): IUser | null => {
  const userToken = retrieveToken('user_token')
  if (!userToken) {
    return null
  }
  const user = JSON.parse(userToken) as IUser
  if (user.email !== email) {
    deleteToken('user_token')
    return null
  }
  return user
}
