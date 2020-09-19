import { CategoryRepository } from '..'
import { Category } from '../../models/entities/Category'
import CategoryModel, { ICategory } from './models/CategoryModel'

export class MongooseCategoryRepository implements CategoryRepository {

	async getAllCategories(): Promise<Category[]> {
		const docs = await CategoryModel.find()
		return MongooseCategoryRepository.deserializeCategories(docs)
	}
	
	async getAllUserCategories(userId: string): Promise<Category[]> {
		const docs = await CategoryModel.find({ creator: userId })
		return MongooseCategoryRepository.deserializeCategories(docs)
	}
	
	async findCategoryById(id: string): Promise<Category> {
		const doc = await CategoryModel.findById(id)
		return MongooseCategoryRepository.deserializeCategory(doc)
	}
	
	async saveCategory(category: Category): Promise<Category> {
		const doc = await CategoryModel.create(category)
		return MongooseCategoryRepository.deserializeCategory(doc)
	}
	
	async updateCategory(categoryId: Category['id'], category: Category): Promise<Category> {
		const doc = await CategoryModel.update({ _id: categoryId }, category)
		return MongooseCategoryRepository.deserializeCategory(doc)
	}
	
	async deleteCategory(categoryId: string): Promise<void> {
		await CategoryModel.deleteOne({ _id: categoryId})
	}
	
	static deserializeCategory(category: ICategory): Category {
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
	
	static deserializeCategories(categories: ICategory[]): Category[] {
		return categories.map(d => MongooseCategoryRepository.deserializeCategory(d))
	}

}

export default new MongooseCategoryRepository()