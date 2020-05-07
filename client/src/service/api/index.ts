import Axios from 'axios'
import { User } from '@/models/user'

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
