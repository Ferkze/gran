import client, { setAuthToken } from './index'
import { User } from '@/models'
import { Token, saveToken, retrieveToken, deleteToken } from '../token'

export interface LoginData {
  email: string
  password?: string
}

export interface LoginResponse {
  success: boolean
  token: Token
  user: User
}

export interface RegisterData {
  name?: string
  email: string
  password: string
  password2?: string
}

const RESOURCE = '/auth'

export const login = async (payload: LoginData): Promise<User> => {
  let user = _currentUser()
  if (user !== null) {
    if (user.email !== payload.email) {
      deleteToken('user_token')
    } else {
      return user
    }
  }
  const path = `${RESOURCE}/login-user`
  const response = await client.post<User>(path, payload)
  user = response.data
  const userToken = JSON.stringify(user) as Token
  saveToken(userToken, 'user_token')
  return user
}

export const loginToken = async (payload: LoginData): Promise<User> => {
  const path = `${RESOURCE}/login`
  const response = await client.post<LoginResponse>(path, payload)
  const { token, user } = response.data
  saveToken(token, 'token')
  saveToken(JSON.stringify(user), 'user_token')
  setAuthToken(token)
  return user
}

export const fetchUser = async (): Promise<User | null> => {
  if (!client.defaults.headers.common['Authorization']) {
    return null
  }
  const path = `${RESOURCE}/current`
  const response = await client.get<User>(path)
  return response.data
}

export const register = async (payload: RegisterData): Promise<User> => {
  const path = `${RESOURCE}/register`
  const response = await client.post<User>(path, payload)
  return response.data
}

export const logout = async () => {
  setAuthToken('')
  deleteToken('token')
  deleteToken('user_token')
  return
}

export const _currentUser = (): User | null => {
  const token = retrieveToken('token')
  if (!token) {
    return null
  }
  if (!token.includes('Bearer ')) {
    return null
  }
  const userToken = retrieveToken('user_token')
  if (!userToken) {
    return null
  }
  return JSON.parse(userToken) as User
}
