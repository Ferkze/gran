import { AuthUsecasesImpl } from "./auth.usecases";
import configDatabase from '../config/database'
import MongooseRepository from '../repositories/mongoose'
import dotenv from  'dotenv'
import UserModel from "../repositories/mongoose/models/UserModel";

const authUcs = new AuthUsecasesImpl(MongooseRepository)

beforeAll(async () => {
	dotenv.config()
	await configDatabase()
})

describe('Authentication', () => {

	let token = ''

	it('should register the user', async () => {
		const user = await authUcs.register({
			email: 'test@test.com',
			name: 'Teste',
			password: '123456',
			password2: '123456'
		})

		expect(user.id).toBeDefined()
		expect(user.email).toBe('test@test.com')
	})

	it('should login the user', async () => {
		const user = await authUcs.login({
			email: 'test@test.com',
			password: '123456',
		})

		expect(user.id).toBeDefined()
		expect(user.email).toBe('test@test.com')
	})

	it('should generate token for the user', async () => {
		const user = await authUcs.login({
			email: 'test@test.com',
			password: '123456',
		})
		token = authUcs.generateToken(user)

		expect(token).toBeDefined()
	})

	it('should get user data from token', async () => {
		const user = await authUcs.getUserFromToken(token)

		expect(user.id).toBeDefined()
		expect(user.email).toBe('test@test.com')
	})

	
	afterAll(async () => {
		await UserModel.deleteOne({ email: 'test@test.com'})
	})

})