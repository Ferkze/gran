import { Request, Response } from 'express'
import { User } from '../models/entities/User'
import usecases from '../usecases'
import BaseController from './base.controller'

export default class UserController extends BaseController {
	// public async index(req: Request, res: Response): Promise<Response> {
	// 	const users = await usecases.listUsers()
	// 	return res.json(users)
	// }
	public async readById(req: Request, res: Response): Promise<Response> {
		const user = await usecases.user.getUser(req.params.userId)
		return res.json({ user })
	}
	// public async store(req: Request, res: Response): Promise<Response> {
	// 	const user = req.body as User
	// 	const userDoc = await UserRepository.saveUser(user)
	// 	return res.json(userDoc)
	// }
	public async update(req: Request, res: Response): Promise<Response> {
		const user = await usecases.user.editUser(req.user['id'], req.body as User)
		return res.json({ user })
	}
	// public async delete(req: Request, res: Response): Promise<Response> {
	// 	const { userId } = req.params
	// 	const deletedUserDoc = await UserRepository.deleteUser(userId)
	// 	return res.json(deletedUserDoc)
	// }
}
