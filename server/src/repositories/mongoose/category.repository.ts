import { CategoryRepository } from '..'
import { Category } from '../../models/entities/Category'

class MongooseCategoryRepository implements CategoryRepository {
	getAllCategories(): Promise<Category[]> {
		throw new Error('Method not implemented.')
	}
	getAllUserCategories(userId: string): Promise<Category[]> {
		throw new Error('Method not implemented.')
	}
	findCategoryById(id: string): Promise<Category> {
		throw new Error('Method not implemented.')
	}
	saveCategory(category: Category): Promise<Category> {
		throw new Error('Method not implemented.')
	}
	updateCategory(category: Category): Promise<Category> {
		throw new Error('Method not implemented.')
	}
	deleteCategory(categoryId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
	

}

export default new MongooseCategoryRepository()