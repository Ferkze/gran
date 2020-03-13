import { api } from './index'
import { IUser, UserDTO } from '@/models/User'

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

export const login = async (data: LoginData): Promise<UserDTO> => {
  const path = '/auth/login'
  const response = await api.post<UserDTO>(path, data)
  return response.data
}

export const register = async (data: RegisterData): Promise<IUser> => {
  const path = '/auth/register'
  const response = await api.post<IUser>(path, data)
  return response.data
}