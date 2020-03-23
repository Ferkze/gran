import { Request, Response } from 'express'
import User, { User as UserModel } from '../models/User'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    return res.json(users)
  }
  public async find(req: Request, res: Response): Promise<Response> {
    const userDoc = await User.findById(req.params.id)
    return res.json(userDoc)
  }
  public async store(req: Request, res: Response): Promise<Response> {
    const user = req.body as UserModel
    const userDoc = await User.create(user)
    return res.json(userDoc)
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body as UserModel
    const user = await User.findByIdAndUpdate(req.params.userId, data, { new: true })
    return res.json(user)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const deletedUserDoc = await User.findOneAndDelete({ _id: req.params.userId })
    return res.json(deletedUserDoc)
  }
}

export default new UserController()