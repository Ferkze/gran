import Axios from 'axios'
import { IUser } from '@/models/User'

interface RequestInterface {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUser[]
}

export const api = Axios.create({ baseURL: 'http://localhost:9090' })

export const getAllUsers = async (): Promise<IUser[]> =>{
  let path = '/users'
  let response = await api.get<RequestInterface>(path)
  return response.data.data
}
