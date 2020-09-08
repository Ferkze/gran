import { Request, Response } from 'express'
import User from '../models/entities/User'
import { LoginData, RegisterData } from '../models/entities/Auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { opts } from '../config/passport'
import usecases from '../usecases'
import { ValidationError } from '../models/errors/ValidationError'

class AuthController {
	public async login(req: Request, res: Response): Promise<Response> {
		const data = req.body as LoginData
		try {
			const user = await usecases.login(data)
			return res.json(user)
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json({
					error: e.message
				})
			}
			return res.status(403).json({
				error: e.message
			})
		}
	}
  
	public async register(req: Request, res: Response): Promise<Response> {
		const data = req.body as RegisterData
		try {
			const user = await usecases.register(data)
			return res.json(user)
		} catch (e) {
			if (e instanceof ValidationError) {
				return res.status(400).json({
					error: e.message
				})
			}
			return res.status(403).json({
				error: e.message
			})
		}
	}

	public async index(req: Request, res: Response): Promise<void> {
		switch (req.params.provider) {
		case 'facebook':
			this._facebookAuth(req, res)
			break
		case 'google':
			this._googleAuth(req, res)
			break
		case 'login':
			this.loginAuth(req, res)
			break
		case 'register':
			this._registerAuth(req, res)
			break
		case 'logout':
			this._logoutAuth(req, res)
			break
		}
		return
	}
	private _facebookAuth(req: Request, res: Response): void {
		console.log(req, res)
		// ...
	}
	private _googleAuth(req: Request, res: Response): void {
		console.log(req, res)
		// ...
	}
	async loginAuth(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body as LoginData
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({
				message: 'Email não encontrado',
			})
		}
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) {
				return res.status(403).json({ message: 'Senha incorreta' })
			}
			const payload = {
				id: user.id,
				name: user.username,
			}
			jwt.sign(
				payload,
				opts.secretOrKey,
				{ expiresIn: 31556926 /*1year*/ },
				(err, token) => {
					if (err) return res.status(500).json({ err })
					return res.json({
						success: true,
						token: 'Bearer ' + token,
						user,
					})
				}
			)
		})
	}
	private _registerAuth(req: Request, res: Response): void {
		console.log(req, res)
		// ...
	}
	private _logoutAuth(req: Request, res: Response): void {
		console.log(req, res)
		// ...
	}
}

export default new AuthController()
