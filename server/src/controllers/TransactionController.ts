import { Request, Response } from 'express'
import Transaction, { Transaction as TransactionModel } from '../models/Transaction'

class TransactionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find().populate('debitAccount creditAccount')
    console.info('Transactions found', transactions)
    return res.json(transactions)
  }

  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const transaction = await Transaction.findById(req.params.transactionId).populate('debitAccount creditAccount')
      return res.json(transaction)
    } catch (error) {
      console.error('Error finding Transaction', error)
      return res.status(404).json({ error })
    }
  }

  public async findByAccount(req: Request, res: Response): Promise<Response> {
    const { accountId } = req.params
    const transactions = await Transaction.find().byAccount(accountId).populate('debitAccount creditAccount')
    return res.json(transactions)
  }

  public async findByUser(req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find({ creator: req.params.userId }).populate('debitAccount creditAccount')
    return res.json(transactions)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const transaction = req.body.transaction as TransactionModel
    if (!transaction.amount) {
      return res.status(400).json({ message: 'A transação precisa ter um valor' })
    }
    console.info('New transaction received', transaction)

    try {
      const doc = await Transaction.create(transaction)
      console.info('New transaction', doc)
      return res.json(doc)
    } catch (error) {
      console.error('Transaction store error', error)
      return res.status(500).json({
        message: error.message
      })
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const transaction = req.body as TransactionModel
    console.info('Transaction received for update', transaction)
    try {
      const doc = await Transaction.findByIdAndUpdate(req.params.transactionId, transaction)
      console.info('Updated transaction', doc)
      return res.json(doc)
    } catch (error) {
      console.error('Transaction update error', error)
      return res.status(500).json({
        message: error.message
      })
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    console.info('Deleting Transaction', req.params.transactionId)
    try {
      const count = await Transaction.deleteOne({ _id: req.params.transactionId })
      console.info('Transactions deleted', count)
      return res.json({ count })
    } catch (error) {
      console.error('Transaction delete error', error)
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export default new TransactionController()