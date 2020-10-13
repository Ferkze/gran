
import { Request, Response } from 'express'
import usecases from '../usecases'
import BaseController from './base.controller'

export default class UserController extends BaseController {

	async get(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		const plannings = await usecases.planning.listPlanningsByUser(userId)
		return res.json(200).json({ plannings })
	}

	async filter(req: Request, res: Response): Promise<Response> {
		const filter = req.query
		if (Object.keys(filter).length == 0)
			filter.user = req.user['id']
		const plannings = await usecases.planning.filterPlannings(filter)
		return res.json(200).json({ plannings })
	}

	async create(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		const data = req.body.planning
		const planning = await usecases.planning.registerPlanning(userId, data)
		return res.json(200).json({ planning })
	}

	async createBudget(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		const { planningId } = req.params
		const data = req.body.budget
		const planning = await usecases.planning.addBudgetToPlanning(userId, planningId, data)
		return res.json(200).json({ planning })
	}

	async updateBudgets(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		const { planningId } = req.params
		const budgets = req.body.budgets
		const planning = await usecases.planning.editPlanning(userId, planningId, { budgets })
		return res.json(200).json({ planning })
	}
}
