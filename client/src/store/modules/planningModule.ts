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
	plannings: Planning[] = [
		{
			id: '1',
			month: 9,
			year: 2020,
			budgets: [
				{ id: '0', type: CategoryType.INCOME, icon: 'mdi-cash', category: 'Salário', current: 1200, value: 1200 },
				{ id: '1', type: CategoryType.INCOME, icon: 'mdi-cash', category: 'Juros de aplicação', current: 150, value: 150 },
				{ id: '2', type: CategoryType.EXPENSE, icon: 'mdi-ticket', category: 'Lazer', current: 120, value: 300 },
				{ id: '3', type: CategoryType.EXPENSE, icon: 'mdi-train-car', category: 'Transporte', current: 250, value: 250 },
				{ id: '4', type: CategoryType.EXPENSE, icon: 'mdi-heart-pulse', category: 'Saúde', current: 200, value: 250 },
				{ id: '5', type: CategoryType.EXPENSE, icon: 'mdi-cart', category: 'Mercado', current: 500, value: 500 },
				{ id: '6', type: CategoryType.EXPENSE, icon: 'mdi-cellphone-wireless', category: 'Telefonia e Internet', current: 120, value: 120 }
			]
		},
		{
			id: '2',
			month: 10,
			year: 2020,
			budgets: [
				{ id: '7', type: CategoryType.INCOME, icon: 'mdi-cash', category: 'Salário', current: 1200, value: 1200 },
				{ id: '8', type: CategoryType.INCOME, icon: 'mdi-cash', category: 'Juros de aplicação', current: 100, value: 200 },
				{ id: '9', type: CategoryType.EXPENSE, icon: 'mdi-ticket', category: 'Lazer', current: 100, value: 300 },
				{ id: '10', type: CategoryType.EXPENSE, icon: 'mdi-train-car', category: 'Transporte', current: 100, value: 250 },
				{ id: '11', type: CategoryType.EXPENSE, icon: 'mdi-heart-pulse', category: 'Saúde', current: 150, value: 250 },
				{ id: '12', type: CategoryType.EXPENSE, icon: 'mdi-cart', category: 'Mercado', current: 450, value: 500 },
				{ id: '13', type: CategoryType.EXPENSE, icon: 'mdi-cellphone-wireless', category: 'Telefonia e Internet', current: 120, value: 120 }
			]
		}
	]

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
