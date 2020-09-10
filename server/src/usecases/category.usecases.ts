import { Repositories } from '../repositories'
import { CategoryUsecases } from '.'

export class CategoryUsecasesImpl implements CategoryUsecases {
	
	constructor(private repo: Repositories) { }

	listCategories(): void {
		throw new Error('Method not implemented.')
	}
	registerCategory(): void {
		throw new Error('Method not implemented.')
	}
	
}