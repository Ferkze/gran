import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'
import BaseController from './base.controller'

const log = debug('app:account:controller')

export default class AccountController extends BaseController {

	public async index(req: Request, res: Response): Promise<Response> {
		const accounts = await usecases.account.listAccountsByUser(req.user['id'])
		return res.status(200).json({ accounts })
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		try {
			const { accountId } = req.params
			const userId = req.user['id']
			const account = await usecases.account.findAccountById(userId, accountId)
			return res.status(200).json({ account })
		} catch (error) {
			log('Erro na busca de conta', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const data = req.body.account
		const userId = req.user['id']
		const account = await usecases.account.registerAccount(userId, data)
		return res.status(200).json({ account })
	}

	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const userId = req.user['id']
			const accountId = req.params.accountId
			const data = req.body
			const account = await usecases.account.editAccount(userId, accountId, data)
			return res.status(200).json({ account })
		} catch (error) {
			log('Erro na atualização de conta', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { accountId } = req.params
		const userId = req.user['id']
		const account = await usecases.account.deleteAccount(userId, accountId)
		return res.status(200).json({ account })
	}

	public async balance(req: Request, res: Response): Promise<Response> {
		const { accountId } = req.params
		try {
			const userId = req.user['id']
			const balance = await usecases.account.getAccountBalance(userId, accountId)
			return res.status(200).json({ balance })
		} catch (error) {
			log(`Erro ao calcular saldo da conta ${accountId}`, error)
			return res.status(500).json({ error: error.message })
		}
	}

}