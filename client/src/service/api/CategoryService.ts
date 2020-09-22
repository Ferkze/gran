import client from './ApiService'
import { Category } from '@/models'
import { AxiosResponse } from 'axios'

interface CategoriesResponse {
	categories: Category[]
}

class CategoryService {
	async getCategories(): Promise<Category[]> {
		return await (await client.get<CategoriesResponse>('/categories')).data.categories
	}
}

export default new CategoryService()
