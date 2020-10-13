import { CategoryRepository } from '..'
import { Category } from '../../models/entities/Category'
import CategoryModel, { ICategory } from './models/CategoryModel'

export class MongooseCategoryRepository implements CategoryRepository {

	async getAllCategories(): Promise<Category[]> {
		const docs = await CategoryModel.find()
		return docs.map(doc => doc.getCategory())
	}
	
	async findCategoryById(id: string): Promise<Category> {
		const doc = await CategoryModel.findById(id)
		return doc.getCategory()
	}
	
	async saveCategory(category: Category): Promise<Category> {
		const doc = await CategoryModel.create(category)
		return doc.getCategory()
	}
	
	async updateCategory(categoryId: Category['id'], category: Category): Promise<Category> {
		const doc = await CategoryModel.update({ _id: categoryId }, category)
		return doc.getCategory()
	}
	
	async deleteCategory(categoryId: string): Promise<void> {
		await CategoryModel.deleteOne({ _id: categoryId})
	}

}

export default new MongooseCategoryRepository()