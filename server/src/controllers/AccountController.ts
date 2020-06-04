import { Request, Response } from 'express'
import Account, { Account as AccountModel } from '../models/Account'

class AccountController {
  public async index(req: Request, res: Response): Promise<Response> {
    const accounts = await Account.find().populate('institution')
  
    return res.json(accounts)
  }
  public async find(req: Request, res: Response): Promise<Response> {
    const account = await Account.findOne({
      _id: req.params.accountId
    }).populate('institution')
  
    return res.json(account)
  }
  public async store(req: Request, res: Response): Promise<Response> {
    const account = req.body as AccountModel
    const doc = await Account.create(account)
    return res.json(doc)
  }
  public async put(req: Request, res: Response): Promise<Response> {
    const account = req.body as AccountModel
    const doc = await Account.findByIdAndUpdate(req.params.accountId, account, { new: true })
    return res.json(doc)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const result = await Account.deleteOne({
      _id: req.params.accountId
    })
    return res.json(result)
  }

  public async balance(req: Request, res: Response): Promise<Response> {
    const { accountId } = req.params
    const transactions = await Transaction.find().byAccount(accountId)
    const balance = transactions.reduce((total, cur) => {
      return total
    }, 0)
    return res.json(balance)
  }
}

export default new AccountController()