import { Request, Response } from 'express'
import usecases from '../usecases'
import BaseController from './base.controller'

export default class BudgetController extends BaseController {

	public async readByUser(req: Request, res: Response): Promise<Response> {usecases.budget.listBudgetsByUser(req.user['id'])
		try {
			const budgets = await usecases.budget.listBudgetsByUser(req.user['id'])
			return res.status(200).json({ budgets })
		} catch (error) {
			return res.status(409).json({ error: error.message })
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const budget = await usecases.budget.editBudget(req.params.budgetId, data)
			return res.status(200).json({ budget })
		} catch (error) {
			return res.status(409).json({ error: error.message })
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const budget = await usecases.budget.registerBudget(data)
			return res.status(200).json({ budget })
		} catch (error) {
			return res.status(409).json({ error: error.message })
		}
	}
	
}
