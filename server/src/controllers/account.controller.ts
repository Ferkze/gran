import { Request, Response } from 'express'
import { Account } from '../models/entities/Account'
import usecases from '../usecases'
import debug from 'debug'
import BaseController from './base.controller'

const log = debug('app:account:controller')

export default class AccountController extends BaseController {

	public async index(req: Request, res: Response): Promise<Response> {
		try {
			const accounts = await usecases.account.listAccountsByUser(req.user['id'])
			return res.status(200).json({ accounts })
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}

	public async findById(req: Request, res: Response): Promise<Response> {
		try {
			const account = await usecases.account.findAccountById(req.params.accountId)
			return res.status(200).json({ account })
		} catch (error) {
			log('Erro na busca de conta', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const account = await usecases.account.registerAccount(req.body as Account)
			return res.status(200).json({ account })
		} catch (error) {
			log('Erro na gravação de conta', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const account = await usecases.account.editAccount(req.body as Account)
			return res.status(200).json({ account })
		} catch (error) {
			log('Erro na atualização de conta', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const account = await usecases.account.deleteAccount(req.params.accountId)
			return res.status(200).json({ account })
		} catch (error) {
			log('Erro na remoção de conta', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async balance(req: Request, res: Response): Promise<Response> {
		const { accountId } = req.params
		try {
			const balance = await usecases.account.getAccountBalance(accountId)
			return res.status(200).json({ balance })
		} catch (error) {
			log(`Erro ao calcular saldo da conta ${accountId}`, error)
			return res.status(500).json({ error: error.message })
		}
	}

}