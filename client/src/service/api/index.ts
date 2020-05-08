import Axios from 'axios'
import { User } from '@/models'
import { Token } from '../token'

interface RequestInterface {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}

const baseDomain = 'http://localhost:5000'
const baseURL = `${baseDomain}/api`

const client = Axios.create({
  baseURL
})

export default client

export const getAllUsers = async (): Promise<User[]> => {
  let response = await client.get<RequestInterface>('/users')
  return response.data.data
}

export const setAuthToken = (token: Token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    client.defaults.headers.common['Authorization'] = token
  } else {
    // Delete auth header
    delete client.defaults.headers.common['Authorization']
  }
}

export const getAuthToken = (): Token => client.defaults.headers.common['Authorization']
