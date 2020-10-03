import { Request, Response } from 'express'
import debug from 'debug'
import usecases from '../usecases'

const log = debug('app:balance:controller')

class BalanceController {

	async index(req: Request, res: Response): Promise<Response> {
		try {
			const balance = await usecases.transaction.getBalance(req.user['id'])
			return res.status(200).json({ balance })
		} catch (error) {
			log('Erro ao editar uma transação', error)
			return res.status(500).json({ error: error.message })
		}
	}
}

export default new BalanceController()