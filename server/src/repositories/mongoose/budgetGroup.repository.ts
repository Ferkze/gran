import { BudgetGroupRepository } from '..'
import { BudgetGroup } from '../../models/entities/BudgetGroup'

class MongooseBudgetGroupRepository implements BudgetGroupRepository {
	getAllBudgetGroups(): Promise<BudgetGroup[]> {
		throw new Error('Method not implemented.')
	}
	getAllUserBudgetGroups(userId: string): Promise<BudgetGroup[]> {
		throw new Error('Method not implemented.')
	}
	findBudgetGroupById(id: string): Promise<BudgetGroup> {
		throw new Error('Method not implemented.')
	}
	saveBudgetGroup(budgetGroup: BudgetGroup): Promise<BudgetGroup> {
		throw new Error('Method not implemented.')
	}
	updateBudgetGroup(budgetGroup: BudgetGroup): Promise<BudgetGroup> {
		throw new Error('Method not implemented.')
	}
	deleteBudgetGroup(budgetGroupId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
	

}

export default new MongooseBudgetGroupRepository()