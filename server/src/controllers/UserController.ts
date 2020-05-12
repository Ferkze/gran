import { Request, Response } from 'express'
import User, { UserType } from '../models/User'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find(null, '-accounts')
    return res.json(users)
  }
  public async find(req: Request, res: Response): Promise<Response> {
    const userDoc = await User.findById(req.params.id, '-accounts')
    return res.json(userDoc)
  }
  public async store(req: Request, res: Response): Promise<Response> {
    const user = req.body as UserType
    const userDoc = await User.create(user)
    return res.json(userDoc)
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body as UserType
    const user = await User.findByIdAndUpdate(req.params.userId, data, { new: true })
    return res.json(user)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const deletedUserDoc = await User.findOneAndDelete({ _id: req.params.userId })
    return res.json(deletedUserDoc)
  }
}

export default new UserController()