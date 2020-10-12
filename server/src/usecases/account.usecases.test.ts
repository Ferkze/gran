import { AuthUsecasesImpl } from "./auth.usecases";
import configDatabase from '../config/database'
import MongooseRepository from '../repositories/mongoose'
import dotenv from  'dotenv'
import UserModel from "../repositories/mongoose/models/UserModel";
import { AccountUsecasesImpl } from "./account.usecases";
import { User } from "../models/entities/User";
import { Account, AccountSubtypes, AccountTypes } from "../models/entities/Account";
import { InstitutionUsecasesImpl } from "./institution.usecases";

describe('Accounts', () => {

	const authUcs = new AuthUsecasesImpl(MongooseRepository)
	const accountUcs = new AccountUsecasesImpl(MongooseRepository)
	const instUcs = new InstitutionUsecasesImpl(MongooseRepository)
	
	let user!: User
	let account: Account = null
	let institutions = []

	beforeAll(async () => {
		dotenv.config()
		await configDatabase()

		user = await authUcs.register({
			email: 'account@test.com',
			name: 'Teste',
			password: '123456',
			password2: '123456'
		})
		institutions = await instUcs.listInstitutions()
	})

	it('should create account', async () => {
		account = {
			name: 'NuBanco',
			main: false,
			institution: institutions[0].id,
			unregisteredInstitution: '',
			type: AccountTypes.DEBIT,
			subtype: AccountSubtypes.CURRENT,
			startingBalance: 200.5,
			owner: user.id
		}
		account = await accountUcs.registerAccount(user.id, account)
		expect(account.id).toBeDefined()
	})

	it('should find account by id', async () => {
		const accountFound = await accountUcs.findAccountById(user.id, account.id)
		expect(account.id).toEqual(accountFound.id)
	})

	it('should edit account ', async () => {
		account = await accountUcs.editAccount(user.id, account.id, {
			...account,
			institution: institutions[1].id,
			name: 'Nome da conta 2',
		})
		expect(account.name).toEqual('Nome da conta 2')
	})

	it('should exist', async () => {
		const accountExists = await MongooseRepository.account.accountExists(user.id, account.id)
		expect(accountExists).toEqual(true)
	})

	it('should be deleted and not exist', async () => {
		await accountUcs.deleteAccount(user.id, account.id)
		const accountExists = await MongooseRepository.account.accountExists(user.id, account.id)
		expect(accountExists).toEqual(false)
	})

	
	afterAll(async () => {
		await UserModel.deleteOne({ email: 'account@test.com'})
	})

})