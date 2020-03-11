import { api } from './index'
import { IUser } from '@/models/User'

interface LoginData {
    email: string
    password?: string
}

interface RegisterData {
  username ?: string
  email ?: string
  password ?: string
  firstName ?: string
  lastName ?: string
  accounts?: Account[]
  createdAt?: string
  updatedAt?: string
}

export const login = async (data: LoginData): Promise<IUser> => {
  const path = '/auth/login'
  const response = await api.post<IUser>(path, data)
  return response.data
}

export const register = async (data: RegisterData): Promise<IUser> => {
  const path = '/auth/register'
  const response = await api.post<IUser>(path, data)
  return response.data
}