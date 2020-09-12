import { Repositories } from '../repositories'
import { CategoryUsecases } from '.'
import { Category } from '../models/entities/Category'
import { User } from '../models/entities/User'

export class CategoryUsecasesImpl implements CategoryUsecases {
	
	constructor(private repo: Repositories) { }

	async listCategories(userId: User['id']): Promise<Category[]> {
		return await this.repo.category.getAllUserCategories(userId)
	}
	async registerCategory(category: Category): Promise<Category> {
		return await this.repo.category.saveCategory(category)
	}
	
}