import { Budget } from "./Budget";
import { Group } from "./Group";
import { User } from "./User";

export interface Planning {
  id?: any
  month: number
	year: number
	user?: User['id']
	group?: Group['id']
	budgets: Budget[]
	createdAt?: Date
	updatedAt?: Date
}

export interface PlanningFilter {
  month?: number
	year?: number
	user?: User['id']
	group?: Group['id']
}