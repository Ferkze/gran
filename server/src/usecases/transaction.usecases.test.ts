import { AuthUsecasesImpl } from "./auth.usecases";
import configDatabase from '../config/database'
import MongooseRepository from '../repositories/mongoose'
import dotenv from  'dotenv'
import UserModel from "../repositories/mongoose/models/UserModel";
import { AccountUsecasesImpl } from "./account.usecases";
import { User } from "../models/entities/User";
import { Account, AccountSubtypes, AccountTypes } from "../models/entities/Account";
import { InstitutionUsecasesImpl } from "./institution.usecases";
import { TransactionUsecasesImpl } from "./transaction.usecases";
import { CategoryUsecasesImpl } from "./category.usecases";
import { Category, CategoryType } from "../models/entities/Category";
import { TransactionType } from "../models/entities/Transaction";
import TransactionModel from "../repositories/mongoose/models/TransactionModel";

describe('Accounts', () => {

	const authUcs = new AuthUsecasesImpl(MongooseRepository)
	const accountUcs = new AccountUsecasesImpl(MongooseRepository)
	const instUcs = new InstitutionUsecasesImpl(MongooseRepository)
	const tranUcs = new TransactionUsecasesImpl(MongooseRepository)
	const catsUcs = new CategoryUsecasesImpl(MongooseRepository)
	
	let user!: User
	let account!: Account
	let categories: Category[] = []

	beforeAll(async () => {
		dotenv.config({
			path: '.env.test'
		})
		await configDatabase()

		user = await authUcs.register({
			email: 'transaction@test.com',
			name: 'Teste transaction',
			password: '123456',
			password2: '123456'
		})
		categories = await catsUcs.listCategories()
		let institutions = await instUcs.listInstitutions()
		account = await accountUcs.registerAccount(user.id, {
			name: 'NuBanco',
			main: false,
			institution: institutions[0].id,
			unregisteredInstitution: '',
			type: AccountTypes.DEBIT,
			subtype: AccountSubtypes.CURRENT,
			startingBalance: 200.5,
			owner: user.id
		})
	})

	it('should create a transaction', async () => {
		const trans1 = await tranUcs.registerTransaction({
			account: account.id,
			amount: 1500,
			category: "5f6bd332fb5bce16e339d783",
			date: new Date(),
			description: 'Salário de Setembro',
			type: TransactionType.DEBIT,
			user: user.id
		})
		const trans2 = await tranUcs.registerTransaction({
			account: account.id,
			amount: 150,
			category: "5f6bd332fb5bce16e339d77c",
			date: new Date(),
			description: 'Mercado',
			type: TransactionType.CREDIT,
			user: user.id
		})

		expect(trans1.id).toBeDefined()
		expect(trans2.id).toBeDefined()
	})

	it('should list created transactions', async () => {
		const transactions = await tranUcs.listTransactionsByUser(user.id)
		expect(transactions.length).toEqual(2)
	})

	it('should calculate user transactions balance', async () => {
		const balance = await tranUcs.getBalance(user.id)
		expect(balance.debits).toEqual(1500)
		expect(balance.credits).toEqual(150)
		expect(balance.balance).toEqual(1350)
	})

	it('should calculate account transactions balance', async () => {
		const balance = await tranUcs.getAccountBalance(user.id, account.id)
		expect(balance.balance).toEqual(1550.5)
	})
	
	it('should filter transactions', async () => {
		const trans = [
			await tranUcs.registerTransaction({
				account: account.id,
				amount: 1500,
				category: "5f6bd332fb5bce16e339d783",
				date: new Date('2020-09-07'),
				description: 'Salário de Setembro',
				type: TransactionType.DEBIT,
				user: user.id
			}),
			await tranUcs.registerTransaction({
				account: account.id,
				amount: 50,
				category: "5f6bd332fb5bce16e339d784",
				date: new Date(),
				description: 'Juros de aplicação',
				type: TransactionType.DEBIT,
				user: user.id
			}),
			await tranUcs.registerTransaction({
				account: account.id,
				amount: 150,
				category: "5f6bd332fb5bce16e339d77c",
				date: new Date(),
				description: 'Mercado',
				type: TransactionType.CREDIT,
				user: user.id
			}),
			await tranUcs.registerTransaction({
				account: account.id,
				amount: 50,
				category: "5f6bd332fb5bce16e339d77a",
				date: new Date(),
				description: 'Uber',
				type: TransactionType.CREDIT,
				user: user.id
			}),
			await tranUcs.registerTransaction({
				account: account.id,
				amount: 200,
				category: "5f6bd332fb5bce16e339d77b",
				date: new Date(),
				description: 'Jantar romântico',
				type: TransactionType.CREDIT,
				user: user.id
			})
		]

		const debits = await tranUcs.getFilteredTransactions({
			type: TransactionType.DEBIT
		})
		expect(debits.length).toEqual(3)
		const credits = await tranUcs.getFilteredTransactions({
			type: TransactionType.CREDIT
		})
		expect(credits.length).toEqual(4)
		const lastMonthTransactions = await tranUcs.getFilteredTransactions({
			start: new Date('2020-09-01'),
			end: new Date('2020-10-01')
		})
		expect(lastMonthTransactions.length).toEqual(1)
		const lastMonthCredits = await tranUcs.getFilteredTransactions({
			start: new Date('2020-09-01'),
			end: new Date('2020-10-01'),
			type: TransactionType.CREDIT
		})
		expect(lastMonthCredits.length).toEqual(0)
	})
	
	afterAll(async () => {
		await UserModel.findByIdAndDelete(user.id)
		await TransactionModel.deleteMany({ user: user.id })
	})

})