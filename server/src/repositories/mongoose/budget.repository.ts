import { BudgetRepository } from '..'
import { Budget } from '../../models/entities/Budget'
import BudgetModel, { IBudget } from './models/BudgetModel'
import { MongooseUserRepository } from './user.repository'

export class MongooseBudgetRepository implements BudgetRepository {
	
	async getAllBudgets(): Promise<Budget[]> {
		const budgets = await BudgetModel.find()
		return budgets.map(budget => MongooseBudgetRepository.deserializeBudget(budget))
	}

	async getAllUserBudgets(userId: string): Promise<Budget[]> {
		const budgets = await BudgetModel.find({ creator: userId })
		return budgets.map(budget => MongooseBudgetRepository.deserializeBudget(budget))
	}

	async findBudgetById(id: string): Promise<Budget> {
		const budget = await BudgetModel.findById(id)
		return MongooseBudgetRepository.deserializeBudget(budget)
	}

	async saveBudget(budget: Budget): Promise<Budget> {
		const doc = await BudgetModel.create(budget)
		return MongooseBudgetRepository.deserializeBudget(doc)
	}

	async updateBudget(budgetId: Budget['id'], budget: Budget): Promise<Budget> {
		delete budget.id
		const doc = await BudgetModel.create(budget)
		return MongooseBudgetRepository.deserializeBudget(doc)
	}

	async deleteBudget(budgetId: string): Promise<void> {
		await BudgetModel.deleteOne({ _id: budgetId })
	}
	
	static deserializeBudget(budget: IBudget): Budget {
		return {
			id: budget._id as string,
			name: budget.name,
			description: budget.description,
			creator: budget.creator,
			members: budget.members.map(member => MongooseUserRepository.deserializeUser(member)),
			createdAt: budget.createdAt,
			updatedAt: budget.updatedAt,
		}
	}

}

export default new MongooseBudgetRepository()
