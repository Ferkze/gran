import { Repositories } from '../repositories'
import { BudgetUsecases } from '.'

export class BudgetUsecasesImpl implements BudgetUsecases {
	
	constructor(private repo: Repositories) { }
	
	listBudgets(): void {
		throw new Error('Method not implemented.')
	}
	registerBudget(): void {
		throw new Error('Method not implemented.')
	}
	
}