import { RepositoriesInterface } from '../repositories'
import { Usecases } from '.'
import validateLoginInput from '../models/validator/login'
import { LoginData, RegisterData } from '../models/entities/Auth'
import { User } from '../models/entities/User'
import { ValidationError } from '../models/errors/ValidationError'
import validateRegisterInput from '../models/validator/register'
import bcrypt from 'bcryptjs'

export class UsecasesImpl implements Usecases {

	constructor(private repo: RepositoriesInterface) { }

	async login(data: LoginData): Promise<User> {
		const { isValid, errors } = validateLoginInput(data)
		if (!isValid) {
			throw new ValidationError(errors)
		}
		const user = await this.repo.UserRepository.findUserByEmail(data.email)
		if (!user) {
			throw new Error('Email inválido')
		}
		return user
	}
	async register(data: RegisterData): Promise<User> {
		const { isValid, errors } = validateRegisterInput(data)
		if (!isValid) {
			throw new ValidationError(errors)
		}
		let user = await this.repo.UserRepository.findUserByEmail(data.email)
		if (user) {
			throw new ValidationError('Email já está sendo utilizado')
		}
		user = await this.repo.UserRepository.saveUser({
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
					user = await this.repo.UserRepository.updateUser(user)
					return resolve(user)
				})
			})
		})
		
	}
	logout(): void {
		throw new Error('Method not implemented.')
	}
	showBalance(): void {
		throw new Error('Method not implemented.')
	}

	async listUsers(): Promise<User[]> {
		return await this.repo.UserRepository.getAllUsers()
	}

	listAccounts(): void {
		throw new Error('Method not implemented.')
	}
	listTransactions(): void {
		throw new Error('Method not implemented.')
	}
	listInstitutions(): void {
		throw new Error('Method not implemented.')
	}
	listCategories(): void {
		throw new Error('Method not implemented.')
	}
	listBudgets(): void {
		throw new Error('Method not implemented.')
	}
	listBudgetGroups(): void {
		throw new Error('Method not implemented.')
	}
	registerAccount(): void {
		throw new Error('Method not implemented.')
	}
	registerTransaction(): void {
		throw new Error('Method not implemented.')
	}
	registerCategory(): void {
		throw new Error('Method not implemented.')
	}
	registerBudget(): void {
		throw new Error('Method not implemented.')
	}
	registerBudgetGroup(): void {
		throw new Error('Method not implemented.')
	}
	joinBudgetGroup(): void {
		throw new Error('Method not implemented.')
	}
}
