import { BudgetRepository } from '..'
import { Budget } from '../../models/entities/Budget'

class MongooseBudgetRepository implements BudgetRepository {
	getAllBudgets(): Promise<Budget[]> {
		throw new Error('Method not implemented.')
	}
	getAllUserBudgets(userId: string): Promise<Budget[]> {
		throw new Error('Method not implemented.')
	}
	findBudgetById(id: string): Promise<Budget> {
		throw new Error('Method not implemented.')
	}
	saveBudget(budget: Budget): Promise<Budget> {
		throw new Error('Method not implemented.')
	}
	updateBudget(budget: Budget): Promise<Budget> {
		throw new Error('Method not implemented.')
	}
	deleteBudget(budgetId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
	

}

export default new MongooseBudgetRepository()