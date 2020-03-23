import { Request, Response } from 'express'
import Transaction, { Transaction as TransactionModel } from '../models/Transaction'

class TransactionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find()

    return res.json(transactions)
  }
  public async find(req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find({
      _id: req.params.transactionId
    })

    return res.json(transactions)
  }
  public async findByAccount(req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find({
      account: req.params.accountId
    })

    return res.json(transactions)
  }
  public async store(req: Request, res: Response): Promise<Response> {
    const transaction = req.body as TransactionModel
    const doc = await Transaction.create(transaction)
    return res.json(doc)
  }
}

export default new TransactionController()