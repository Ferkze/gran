import Axios from 'axios'
import { IUser } from '@/models/User'

interface RequestInterface {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUser[]
}

export abstract class UsersApi {
    private static usersAxios = Axios.create();
  
    static async getAllUsers(): Promise<IUser[]>{
      let url = 'http://localhost:9090/users'
      let response = await this.usersAxios.get<RequestInterface>(url)
      return response.data.data
    }
}