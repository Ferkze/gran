import { Budget, Planning, PlanningFilter } from '@/models';
import { CategoryType } from '@/models/enums';
import ApiService, { debug } from "./ApiService";

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
		console.log(process.env)
		if (debug()) return [{"id":"1","month":9,"year":2020,"budgets":[{"id":"0","type":"renda","icon":"mdi-cash","category":"Salário","current":1200,"value":1200},{"id":"1","type":"renda","icon":"mdi-cash","category":"Juros de aplicação","current":150,"value":150},{"id":"2","type":"gasto","icon":"mdi-ticket","category":"Lazer","current":120,"value":300},{"id":"3","type":"gasto","icon":"mdi-train-car","category":"Transporte","current":250,"value":250},{"id":"4","type":"gasto","icon":"mdi-heart-pulse","category":"Saúde","current":200,"value":250},{"id":"5","type":"gasto","icon":"mdi-cart","category":"Mercado","current":500,"value":500},{"id":"6","type":"gasto","icon":"mdi-cellphone-wireless","category":"Telefonia e Internet","current":120,"value":120}]},{"id":"2","month":10,"year":2020,"budgets":[{"id":"7","type":"renda","icon":"mdi-cash","category":"Salário","current":1200,"value":1200},{"id":"8","type":"renda","icon":"mdi-cash","category":"Juros de aplicação","current":100,"value":200},{"id":"9","type":"gasto","icon":"mdi-ticket","category":"Lazer","current":100,"value":300},{"id":"10","type":"gasto","icon":"mdi-train-car","category":"Transporte","current":100,"value":250},{"id":"11","type":"gasto","icon":"mdi-heart-pulse","category":"Saúde","current":150,"value":250},{"id":"12","type":"gasto","icon":"mdi-cart","category":"Mercado","current":450,"value":500},{"id":"13","type":"gasto","icon":"mdi-cellphone-wireless","category":"Telefonia e Internet","current":120,"value":120}]}]
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

	async updatePlanningBudgets(planningId: Planning['id'], budgets: Budget[]) {
		const response = await ApiService.put<PlanningResponse>(`/api/plannings/${planningId}/budgets`, { budgets })
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.planning
	}
}

export default new PlanningService()