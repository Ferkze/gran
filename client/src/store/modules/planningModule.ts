import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import PlanningService from '@/service/api/PlanningService'
import auth from './auth'

import { Budget, Planning, PlanningFilter } from '@/models'
import { CategoryType } from '@/models/enums'

@Module({
	store,
	dynamic: true,
	namespaced: true,
	name: 'planning'
})
class PlanningModule extends VuexModule {
	plannings: Planning[] = []

	@Action({ commit: 'mutatePlannings', rawError: true })
	async fetchPlannings(filter: PlanningFilter): Promise<Planning[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		return await PlanningService.getPlannings(filter)
	}

	@Action({ commit: 'mutatePlanning', rawError: true })
	async createPlanning(data: Planning): Promise<Planning | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await PlanningService.savePlanning(data)
	}

	@Action({ commit: 'mutatePlanning', rawError: true })
	async createBudget({ planningId, data }: { planningId: Planning['id'], data: Budget }): Promise<Planning | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await PlanningService.saveBudget(planningId, data)
	}

	@Action({ commit: 'mutatePlanning', rawError: true })
	async updatePlanningBudgets({ planningId, budgets }: { planningId: Planning['id'], budgets: Budget[] }) {
		if (!auth.user || !auth.user.id) {
			return null
		}
		return await PlanningService.updatePlanningBudgets(planningId, budgets)
	}

	@Mutation
	mutatePlannings(plannings: Planning[]) {
		this.plannings = plannings
	}

	@Mutation
	mutatePlanning(planning: Planning) {
		const index = this.plannings.findIndex(p => p.id = planning.id)
		this.plannings.splice(index, 1, planning)
	}
}

export default getModule(PlanningModule)
