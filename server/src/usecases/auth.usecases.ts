import { AuthUsecases } from '.'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { ValidationError } from '../models/errors/ValidationError'
import validateRegisterInput from '../models/validator/register'
import validateLoginInput from '../models/validator/login'
import { Repositories } from '../repositories'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { opts } from '../config/passport'
import { User } from '../models/entities/User'

interface UserDataPayload {
	id: User['id']
	email: User['email']
}

export class AuthUsecasesImpl implements AuthUsecases {
	
	constructor(private repo: Repositories) { }

	async login(data: LoginData): Promise<User> {
		const { isValid, errors } = validateLoginInput(data)
		if (!isValid) {
			throw new ValidationError(errors)
		}
		const { email, password } = data as LoginData
		const user = await this.repo.user.findUserByEmail(email)
		if (!user) {
			throw new Error('Usuário não encontrado')
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw new Error('Senha incorreta')
		}
		return user
	}

	generateToken(user: User): string {
		const payload: UserDataPayload = {
			id: user.id,
			email: user.email,
		}
		return jwt.sign(payload, opts.secretOrKey, { expiresIn: 31556926 }) /* 1year */
	}

	async getUserFromToken(token: string): Promise<User> {
		const payload = jwt.decode(token, { json: true })
		if (!payload) {
			return null
		}
		return await this.repo.user.findUserById(payload['id'])
	}

	async register(data: RegisterData): Promise<User> {
		const { isValid, errors } = validateRegisterInput(data)
		if (!isValid) {
			throw new ValidationError(errors)
		}
		let user = await this.repo.user.findUserByEmail(data.email)
		if (user) {
			throw new ValidationError('Email já está sendo utilizado')
		}
		user = await this.repo.user.saveUser({
			id: '',
			username: data.name,
			firstName: data.name.split(' ')[0],
			lastName: data.name.split(' ')[1] || '',
			email: data.email,
			password: data.password,
			accounts: [],
			budgets: [],
			createdAt: Date.now(),
			updatedAt: Date.now()
		})
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, async (err, hash) => {
					if (err) reject(err)
					user.password = hash
					user = await this.repo.user.updateUser(user)
					return resolve(user)
				})
			})
		})
		
	}
	
	logout(): void {
		throw new Error('Method not implemented.')
	}
	
}