import { Repositories } from '../repositories'
import { CategoryUsecases } from '.'
import { Category } from '../models/entities/Category'

export class CategoryUsecasesImpl implements CategoryUsecases {
	
	constructor(private repo: Repositories) { }
	
	editCategory(id: string, data: Category): Promise<Category> {
		throw new Error('Method not implemented.')
	}
	async listCategories(): Promise<Category[]> {
		return await this.repo.category.getAllCategories()
	}
	async registerCategory(category: Category): Promise<Category> {
		return await this.repo.category.saveCategory(category)
	}

	
}