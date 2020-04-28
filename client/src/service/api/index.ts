import Axios from 'axios'
import { IUser, User } from '@/models/User'

interface RequestInterface {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: IUser[]
}

const baseDomain = 'http://localhost:5000'
const baseURL = `${baseDomain}/api`

const client = Axios.create({
  baseURL
})

export default client

export const getAllUsers = async (): Promise<User[]> => {
  let response = await client.get<RequestInterface>('/users')
  return response.data.data.map(userDTO => new User(userDTO))
}
