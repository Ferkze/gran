import { Repositories } from '../repositories'
import { PlanningUsecases } from '.'
import { CalculatedPlanning, Planning, PlanningFilter } from '../models/entities/Planning'
import { UsecaseError } from '../models/errors/UsecaseError'
import { User } from '../models/entities/User'
import { Budget, CalculatedBudget } from '../models/entities/Budget'
import { Group } from '../models/entities/Group'
import moment from 'moment'
import { TransactionFilter, TransactionType } from '../models/entities/Transaction'
import { CategoryType } from '../models/entities/Category'

export class PlanningUsecasesImpl implements PlanningUsecases {
	
	constructor(private repo: Repositories) { }

	async listPlanningsByUser(userId: string): Promise<Planning[]> {
		const plannings = await this.repo.planning.getUserPlannings(userId)
		return await this.calculatePlanningsProgress(plannings)
	}

	async filterPlannings(filter: PlanningFilter): Promise<Planning[]> {
		const plannings = await this.repo.planning.getFilteredPlannings(filter)
		if (filter.group)
			return await this.calculateGroupPlanningsProgress(plannings)
		else
			return await this.calculatePlanningsProgress(plannings)
	}

	async findPlanningById(userId: User['id'], planningId: Planning['id']): Promise<Planning | null> {
		const planning = await this.repo.planning.findUserPlanningById(userId, planningId)
		return await this.calculatePlanningProgress(planning)
	}

	async deletePlanning(userId: User['id'], planningId: Planning['id']):  Promise<void> {
		if (!this.repo.planning.planningExists(userId, planningId)) {
			throw new UsecaseError('Planejamento não existe')
		}
		return await this.repo.planning.deleteUserPlanning(userId, planningId)
	}

	async editPlanning(userId: User['id'], planningId: Planning['id'], data: any): Promise<Planning> {
		await this.repo.planning.updateUserPlanning(userId, planningId, data)
		const planning = await this.findPlanningById(userId, planningId)
		return await this.calculatePlanningProgress(planning)
	}

	async editGroupPlanning(groupId: Group['id'], planningId: Planning['id'], data: any): Promise<Planning> {
		await this.repo.planning.updateGroupPlanning(groupId, planningId, data)
		const planning = await this.repo.planning.findGroupPlanningById(groupId, planningId)
		return await this.calculateGroupPlanningProgress(planning)
	}

	async registerPlanning(userId: User['id'], planning: Planning): Promise<Planning> {
		planning.user = userId
		return await this.repo.planning.saveUserPlanning(userId, planning)
	}

	async registerGroupPlanning(groupId: Group['id'], data: Planning): Promise<Planning> {
		data.group = groupId
		const planning = await this.repo.planning.saveGroupPlanning(groupId, data)
		return this.calculateGroupPlanningProgress(planning)
	}

	async addBudgetToPlanning(userId: User['id'], planningId: Planning['id'], data: Budget): Promise<Planning> {
		const planning = await this.repo.planning.findUserPlanningById(userId, planningId)
		planning.budgets.push(data)
		return await this.repo.planning.updateUserPlanning(userId, planningId, { budgets: planning.budgets })
	}

	private async calculatePlanningsProgress(plannings: Planning[]): Promise<CalculatedPlanning[]> {
		const calculatedPlannings = plannings.map(async planning => {
			const calculatedPlanning = await this.calculatePlanningProgress(planning)
			return calculatedPlanning
		})
		return await Promise.all(calculatedPlannings)
	}

	private async calculatePlanningProgress(planning: Planning): Promise<CalculatedPlanning> {
		const calculatedBudgets = planning.budgets.map(async budget => {
			const filter: TransactionFilter = {
				category: budget.category,
				user: planning.user,
				type: budget.type == CategoryType.EXPENSE ? TransactionType.CREDIT : TransactionType.DEBIT
			}
			const date = moment(`${planning.month.toString().padStart(2, '0')}-${planning.year}`, "MM-YYYY")
			filter.start = date.startOf('month').toDate()
			filter.end = date.endOf('month').toDate()
			const transactions = await this.repo.transaction.getFilteredTransactions(filter)
			const calculatedBudget: CalculatedBudget = {
				...budget,
				current: transactions.reduce((acc, cur) => acc + cur.amount, 0)
			}
			return calculatedBudget
		})
		return {
			...planning,
			budgets: await Promise.all(calculatedBudgets)
		}
	}

	private async calculateGroupPlanningsProgress(plannings: Planning[]): Promise<CalculatedPlanning[]> {
		const calculatedPlannings = plannings.map(async planning => {
			const calculatedPlanning = await this.calculateGroupPlanningProgress(planning)
			return calculatedPlanning
		})
		return await Promise.all(calculatedPlannings)
	}

	private async calculateGroupPlanningProgress(planning: Planning): Promise<CalculatedPlanning> {
		const calculatedBudgets = planning.budgets.map(async budget => {
			const filter: TransactionFilter = {
				category: budget.category,
				group: planning.group,
				type: budget.type == CategoryType.EXPENSE ? TransactionType.CREDIT : TransactionType.DEBIT
			}
			const date = moment(`${planning.month.toString().padStart(2, '0')}-${planning.year}`, "MM-YYYY")
			filter.start = date.startOf('month').toDate()
			filter.end = date.endOf('month').toDate()
			const transactions = await this.repo.transaction.getFilteredTransactions(filter)
			const calculatedBudget: CalculatedBudget = {
				...budget,
				current: transactions.reduce((acc, cur) => acc + cur.amount, 0)
			}
			return calculatedBudget
		})
		return {
			...planning,
			budgets: await Promise.all(calculatedBudgets)
		}
	}
}