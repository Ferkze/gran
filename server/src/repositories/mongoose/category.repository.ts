import { CategoryRepository } from '..'
import { Category } from '../../models/entities/Category'
import CategoryModel, { ICategory } from './models/CategoryModel'

class MongooseCategoryRepository implements CategoryRepository {
	async getAllCategories(): Promise<Category[]> {
		const docs = await CategoryModel.find()
		return docs.map(d => this.deserialize(d))
	}
	async getAllUserCategories(userId: string): Promise<Category[]> {
		const docs = await CategoryModel.find({ creator: userId })
		return docs.map(d => this.deserialize(d))
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
	
	private deserialize(category: ICategory): Category {
		return {
			id: category._id,
			name: category.name,
			creator: category.creator,
			type: category.type,
			colors: {
				primary: category.colors.primary,
				secondary: category.colors.secondary,
			},
			createdAt: category.createdAt,
			updatedAt: category.updatedAt,
		}
	}

}

export default new MongooseCategoryRepository()