import { Repositories } from '../repositories'
import { PlanningUsecases } from '.'
import { Planning, PlanningFilter } from '../models/entities/Planning'
import { UsecaseError } from '../models/errors/UsecaseError'
import { User } from '../models/entities/User'

export class PlanningUsecasesImpl implements PlanningUsecases {
	
	constructor(private repo: Repositories) { }

	async listPlanningsByUser(userId: string): Promise<Planning[]> {
		return this.repo.planning.getUserPlannings(userId)
	}

	async filterPlannings(userId: User['id'], filter: PlanningFilter): Promise<Planning[]> {
		filter.user = userId
		return this.repo.planning.getFilteredPlannings(filter)
	}

	async findPlanningById(userId: User['id'], planningId: Planning['id']): Promise<Planning | null> {
		return this.repo.planning.findUserPlanningById(userId, planningId)
	}

	async deletePlanning(userId: User['id'], planningId: Planning['id']):  Promise<void> {
		if (!this.repo.planning.planningExists(userId, planningId)) {
			throw new UsecaseError('Planejamento não existe')
		}
		return await this.repo.planning.deleteUserPlanning(userId, planningId)
	}

	async editPlanning(userId: User['id'], planningId: Planning['id'], data: any): Promise<Planning> {
		return await this.repo.planning.updateUserPlanning(userId, planningId, data)
	}

	async registerPlanning(userId: User['id'], planning: Planning): Promise<Planning> {
		return await this.repo.planning.saveUserPlanning(userId, planning)
	}

}