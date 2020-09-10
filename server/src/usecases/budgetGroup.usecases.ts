import { Repositories } from '../repositories'
import { BudgetGroupUsecases } from '.'

export class BudgetGroupUsecasesImpl implements BudgetGroupUsecases {
	
	constructor(private repo: Repositories) { }
	listBudgetGroups(): void {
		throw new Error('Method not implemented.')
	}
	registerBudgetGroup(): void {
		throw new Error('Method not implemented.')
	}
	joinBudgetGroup(): void {
		throw new Error('Method not implemented.')
	}
	
}