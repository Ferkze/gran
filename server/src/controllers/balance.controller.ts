import { Request, Response } from 'express'
import debug from 'debug'
import usecases from '../usecases'
import BaseController from './base.controller'

const log = debug('app:balance:controller')

export default class BalanceController extends BaseController {

	async index(req: Request, res: Response): Promise<Response> {
		try {
			const filter = Object.assign({}, req.query)
			filter.user = req.user['id']
			const balance = await usecases.transaction.getBalance(filter)
			return res.status(200).json({ balance })
		} catch (error) {
			log('Erro ao calcular saldos', error)
			return res.status(500).json({ error: error.message })
		}
	}
}
