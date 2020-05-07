import { Request, Response } from 'express'
import Account, { Account as AccountModel } from '../models/Account'
import User from '../models/User'

class UserAccountController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({
      _id: req.params.userId
    }, 'accounts')
    return res.json(user.accounts)
  }
  public async store(req: Request, res: Response): Promise<Response> {
    console.log(req.body)
    const account = new Account(req.body.account)
    let user = await User.findById(req.params.userId)
    account.owner = user._id
    const doc = await account.save()
    user.accounts.push(doc)
    user = await user.save()
    return res.json(user.accounts.id(doc._id))
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body.account
    const user = await User.findById(req.params.userId)
    const account = user.accounts.id(req.params.accountId)
    Object.keys(data).forEach(k => {
      account[k] = data[k]
    })
    await user.save()
    return res.json(account)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const user = await User.findById(req.params.userId)
    const account = await user.accounts.id(req.params.accountId)
    if (account !== null) {
      account.remove()
      await user.save()
    }
    return res.json(account)
  }
}

export default new UserAccountController()