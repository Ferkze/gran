import { Request, Response } from 'express'
import { LoginData, RegisterData } from '../models/entities/Auth'
import usecases from '../usecases'
import { ValidationError } from '../models/errors/ValidationError'

class AuthController {
	async login(req: Request, res: Response): Promise<Response> {
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
  
	async register(req: Request, res: Response): Promise<Response> {
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

	async current(req: Request, res: Response): Promise<Response> {
		const token = req.headers['Authorization'].toString()

		if(!token) {
			return res.status(400).json({ error: 'Nenhum token especificado' })
		} else if(!token.startsWith('Bearer ')) {
			return res.status(400).json({ error: 'Token inválido' })
		}

		usecases.auth.getUserFromToken(token.replace('Bearer ', '').trim())

	}
	
}

export default new AuthController()
