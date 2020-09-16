import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'

const log = debug('app:budgetGroup:controller')

class BudgetGroupController {

	async update(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const budgetGroup = await usecases.budgetGroup.editBudgetGroup(req.params.budgetGroupId, data)
			return res.status(200).json({ budgetGroup })
		} catch (error) {
			log('Erro ao editar um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async readByUser(req: Request, res: Response): Promise<Response> {
		try {
			const budgetGroups = await usecases.budgetGroup.listBudgetGroups(req.user['id'])
			return res.status(200).json({ budgetGroups })
		} catch (error) {
			log('Erro ao obter orçamentos de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const budgetGroup = await usecases.budgetGroup.registerBudgetGroup(data)
			return res.status(200).json({ budgetGroup })
		} catch (error) {
			log('Erro ao criar um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async joinBudgetGroup(req: Request, res: Response): Promise<Response> {
		try {
			const budgetGroup = await usecases.budgetGroup.joinBudgetGroup(req.user['id'], req.params.budgetGroupId)
			return res.status(200).json({ budgetGroup })
		} catch (error) {
			log('Erro ao entrar em um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

}

export default new BudgetGroupController()