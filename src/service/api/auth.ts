import client from './index'
import { IUser, User } from '@/models/User'

export interface LoginData {
    email: string
    password?: string
}

export interface RegisterData {
  username ?: string
  email ?: string
  password ?: string
  firstName ?: string
  lastName ?: string
  accounts?: Account[]
  createdAt?: string
  updatedAt?: string
}

const resource = '/auth'

export const login = async (payload: LoginData): Promise<User> => {
  const path = `${resource}/login`
  const response = await client.post<IUser>(path, payload)
  return new User(response.data)
}

export const register = async (payload: RegisterData): Promise<User> => {
  const path = `${resource}/register`
  const response = await client.post<IUser>(path, payload)
  return new User(response.data)
}