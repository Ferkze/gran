import { Budget, Planning, PlanningFilter } from '@/models';
import ApiService from "./ApiService";

interface PlanningsResponse {
	plannigns: Planning[]
	error?: string
}

interface PlanningResponse {
	planning: Planning
	error?: string
}

class PlanningService {

  async getPlannings(filter: PlanningFilter)  {
		const response = await ApiService.get<PlanningsResponse>('/api/plannings', { params: filter })
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.plannigns
	}
	
	async savePlanning(planning: Planning) {
		const response = await ApiService.post<PlanningResponse>('/api/plannings', { planning })
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.planning
	}

	async saveBudget(planningId: Planning['id'], budget: Budget) {
		const response = await ApiService.post<PlanningResponse>(`/api/plannings/${planningId}/budgets`, { budget })
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.planning
	}
}

export default new PlanningService()