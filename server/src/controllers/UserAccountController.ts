import { Request, Response } from 'express'
import Account, { Account as AccountModel} from '../models/Account'
import User from '../models/User'

class UserAccountController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({
      _id: req.params.userId
    }, 'accounts')
    return res.json(user)
  }
  public async store(req: Request, res: Response): Promise<Response> {
    const account = new Account(req.body)
    let user = await User.findById(req.params.userId)
    account.owner = user._id
    const doc = await account.save()
    user.accounts.push(doc)
    user = await user.save()
    return res.json(user.accounts.id(doc._id))
  }
  public async update(req: Request, res: Response): Promise<Response> {
    let data = req.body
    const user = await User.findById(req.params.userId)
    let account = user.accounts.id(req.params.accountId)
    account.name = data.name
    account.startingBalance = data.startingBalance
    await user.save()
    return res.json(account)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(req.params.userId)
    let account = await user.accounts.id(req.params.accountId)
    if (account !== null) {
      account.remove()
      await user.save()
    }
    return res.json(account)
  }
}

export default new UserAccountController()