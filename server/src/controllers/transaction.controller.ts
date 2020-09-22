import { Request, Response } from 'express'
import debug from 'debug'
import usecases from '../usecases'

const log = debug('app:transaction:controller')

class TransactionController {
	public async readByUser(req: Request, res: Response): Promise<Response> {
		const transactions = await usecases.transaction.listTransactionsByUser(req.user['id'])
		return res.status(200).json({ transactions })
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
		const data = req.body
		try {
			const transaction = await usecases.transaction.editTransaction(req.params.transactionId, data)
			return res.status(200).json({ transaction })
		} catch (error) {
			log('Erro ao editar uma transação', error)
			return res.status(500).json({ error: error.message })
		}
	}

	// public async remove(req: Request, res: Response): Promise<Response> {
	// 	const { transactionId } = req.params
	// 	log('Deleting Transaction', transactionId)
	// 	try {
	// 		const count = await Transaction.deleteOne({ _id: transactionId })
	// 		log('Transactions deleted', count)
	// 		return res.json({ count })
	// 	} catch (error) {
	// 		log('Transaction delete error', error)
	// 		return res.status(500).json({
	// 			message: error.message
	// 		})
	// 	}
	// }
}

export default new TransactionController()