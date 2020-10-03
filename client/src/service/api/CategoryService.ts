import client from './ApiService'
import { Category } from '@/models'
import { AxiosResponse } from 'axios'

interface CategoriesResponse {
	categories: Category[]
}

class CategoryService {
	async getCategories(): Promise<Category[]> {
		const response = await client.get<CategoriesResponse>('/categories')
		const categories = response.data.categories
		return categories
	}
}

export default new CategoryService()
