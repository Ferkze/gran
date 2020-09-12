import { Request, Response } from 'express'
import { User } from '../models/entities/User'
import usecases from '../usecases'

class UserController {
	// public async index(req: Request, res: Response): Promise<Response> {
	// 	const users = await usecases.listUsers()
	// 	return res.json(users)
	// }
	// public async find(req: Request, res: Response): Promise<Response> {
	// 	const userDoc = await UserRepository.findUserById(req.params.id)
	// 	return res.json(userDoc)
	// }
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

export default new UserController()