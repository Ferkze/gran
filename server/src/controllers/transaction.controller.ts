import { Request, Response } from 'express'
import debug from 'debug'
import usecases from '../usecases'

const log = debug('app:transaction:controller')

class TransactionController {
	public async index(req: Request, res: Response): Promise<Response> {
		const transactions = await usecases.transaction.listTransactions()
		log('Transactions found', transactions)
		return res.json(transactions)
	}

	// public async find(req: Request, res: Response): Promise<Response> {
	// 	try {
	// 		const transaction = await Transaction.findById(req.params.transactionId).populate('debitAccount creditAccount')
	// 		return res.json(transaction)
	// 	} catch (error) {
	// 		log('Error finding Transaction', error)
	// 		return res.status(404).json({ error })
	// 	}
	// }

	// public async findByAccount(req: Request, res: Response): Promise<Response> {
	// 	const { accountId } = req.params
	// 	const transactions = await Transaction.find().byAccount(accountId).populate('debitAccount creditAccount')
	// 	return res.json(transactions)
	// }

	// public async findByUser(req: Request, res: Response): Promise<Response> {
	// 	const transactions = await Transaction.find({ creator: req.params.userId }).populate('debitAccount creditAccount')
	// 	return res.json(transactions)
	// }

	// public async store(req: Request, res: Response): Promise<Response> {
	// 	const transaction = req.body.transaction as TransactionModel
	// 	if (!transaction.amount) {
	// 		return res.status(400).json({ message: 'A transação precisa ter um valor' })
	// 	}
	// 	log('New transaction received', transaction)

	// 	try {
	// 		const doc = await Transaction.create(transaction)
	// 		log('New transaction', doc)
	// 		return res.json(doc)
	// 	} catch (error) {
	// 		log('Transaction store error', error)
	// 		return res.status(500).json({
	// 			message: error.message
	// 		})
	// 	}
	// }

	// public async update(req: Request, res: Response): Promise<Response> {
	// 	const transaction = req.body as TransactionModel
	// 	log('Transaction received for update', transaction)
	// 	try {
	// 		const doc = await Transaction.findByIdAndUpdate(req.params.transactionId, transaction)
	// 		log('Updated transaction', doc)
	// 		return res.json(doc)
	// 	} catch (error) {
	// 		log('Transaction update error', error)
	// 		return res.status(500).json({
	// 			message: error.message
	// 		})
	// 	}
	// }

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