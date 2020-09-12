import client from './ApiService'
import { Category } from '@/models'
import { AxiosResponse } from 'axios'

class CategoryService {
	getCategories(): Promise<AxiosResponse<Category[]>> {
		return client.get<Category[]>('/categories')
	}
}

export default new CategoryService()
