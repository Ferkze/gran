import { Request, Response } from 'express'
import debug from 'debug'
import usecases from '../usecases'
import BaseController from './base.controller'
import { use } from 'passport'

const log = debug('app:transaction:controller')

export default class TransactionController extends BaseController {
	public async getByUser(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		const transactions = await usecases.transaction.listTransactionsByUser(userId)
		return res.status(200).json({ transactions })
	}

	public async filter(req: Request, res: Response): Promise<Response> {
		const filter = req.query
		const transactions = await usecases.transaction.getFilteredTransactions(filter)
		return res.status(200).json({ transactions })
	}

	public async find(req: Request, res: Response): Promise<Response> {
		const { transactionId } = req.params
		const transactions = await usecases.transaction.getFilteredTransactions({ id: transactionId })
		if (transactions.length == 1)
			return res.status(200).json({ transaction: transactions[0] })
		else 
			return res.status(200).json({ error: 'Transação não encontrada' })
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const data = req.body.transaction
		try {
			const transaction = await usecases.transaction.registerTransaction(data)
			return res.status(200).json({ transaction })
		} catch (error) {
			log('Erro ao gravar uma transação', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const data = req.body.transaction
		const { transactionId } = req.params
		try {
			const transaction = await usecases.transaction.editTransaction(transactionId, data)
			return res.status(200).json({ transaction })
		} catch (error) {
			log('Erro ao editar uma transação', error)
			return res.status(500).json({ error: error.message })
		}
	}

	public async remove(req: Request, res: Response): Promise<Response> {
		const { transactionId } = req.params
		const userId = req.user['id']
		log('Deleting Transaction', transactionId)
		try {
			const deleted = await usecases.transaction.removeTransaction(userId, transactionId)
			log('Transaction deleted', deleted)
			return res.status(200).json({ deleted })
		} catch (error) {
			log('Transaction delete error', error)
			return res.status(500).json({
				message: error.message
			})
		}
	}

	public async balance(req: Request, res: Response): Promise<Response> {
		// const filters = req.query
		try {
			const transaction = await usecases.transaction.getBalance(req.user['id'])
			return res.status(200).json({ transaction })
		} catch (error) {
			log('Erro ao editar uma transação', error)
			return res.status(500).json({ error: error.message })
		}
	}
}
