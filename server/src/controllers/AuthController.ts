import { Request, Response } from 'express'
import { LoginData, RegisterData } from '../models/entities/Auth'
import usecases from '../usecases'
import { ValidationError } from '../models/errors/ValidationError'

class AuthController {
	public async login(req: Request, res: Response): Promise<Response> {
		try {
			const user = await usecases.auth.login(req.body as LoginData)
			const token = usecases.auth.generateToken(user)
			return res.json({
				token: `Bearer ${token}`,
				user
			})
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json({ error: e.message })
			}
			return res.status(403).json({ error: e.message })
		}
	}
  
	public async register(req: Request, res: Response): Promise<Response> {
		try {
			const user = await usecases.auth.register(req.body as RegisterData)
			const token = usecases.auth.generateToken(user)
			return res.json({
				token: `Bearer ${token}`,
				user
			})
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json({ error: e.message })
			}
			return res.status(403).json({ error: e.message })
		}
	}
	
}

export default new AuthController()
