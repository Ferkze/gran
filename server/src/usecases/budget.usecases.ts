import { Repositories } from '../repositories'
import { BudgetUsecases } from '.'
import { Budget } from '../models/entities/Budget'

export class BudgetUsecasesImpl implements BudgetUsecases {
	
	constructor(private repo: Repositories) { }
	
	editBudget(id: string, data: Budget): Promise<Budget> {
		throw new Error('Method not implemented.')
	}
	listBudgetsByUser(userId: string): Promise<Budget[]> {
		throw new Error('Method not implemented.')
	}
	registerBudget(data: Budget): Promise<Budget> {
		throw new Error('Method not implemented.')
	}
	
}