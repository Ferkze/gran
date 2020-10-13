import database from "../config/database"
import { Account, AccountSubtypes, AccountTypes } from "../models/entities/Account"
import { Category, CategoryType } from "../models/entities/Category"
import { Planning } from "../models/entities/Planning"
import { TransactionType } from "../models/entities/Transaction"
import { User } from "../models/entities/User"
import repositories from "../repositories"
import UserModel from "../repositories/mongoose/models/UserModel"
import { AccountUsecasesImpl } from "./account.usecases"
import { AuthUsecasesImpl } from "./auth.usecases"
import { CategoryUsecasesImpl } from "./category.usecases"
import { InstitutionUsecasesImpl } from "./institution.usecases"
import { PlanningUsecasesImpl } from "./planning.usecases"
import { TransactionUsecasesImpl } from "./transaction.usecases"

describe('Plannings usecases', () => {

	const authUcs = new AuthUsecasesImpl(repositories)
	const accountUcs = new AccountUsecasesImpl(repositories)
	const instUcs = new InstitutionUsecasesImpl(repositories)
	const tranUcs = new TransactionUsecasesImpl(repositories)
	const catsUcs = new CategoryUsecasesImpl(repositories)
	const planUcs = new PlanningUsecasesImpl(repositories)
	
	let user!: User
	let account!: Account
	let categories: Category[] = []
	let plannings: Planning[] = []

	beforeAll(async () => {
		require('dotenv').config({
			path: '.env.test'
		})
		await database()

		user = await authUcs.register({
			email: 'plannings@test.com',
			name: 'Teste plannings',
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

	it('should registerPlanning', async () => {
		const p1 = await planUcs.registerPlanning(user.id, {
			"month": 9,
			"year": 2020,
			"budgets": [
				{
					"type": CategoryType.INCOME,
					"category": "5f6bd332fb5bce16e339d783",
					"value": 1200
				},
				{
					"type": CategoryType.INCOME,
					"category": "5f6bd332fb5bce16e339d784",
					"value": 150
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f84db493301f64c4281482c",
					"value": 300
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d77a",
					"value": 250
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d779",
					"value": 250
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d77c",
					"value": 500
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d77e",
					"value": 120
				}
			],
			// user: user.id
		})
		const p2 = await planUcs.registerPlanning(user.id, {
			"month": 10,
			"year": 2020,
			"budgets": [
				{
					"type": CategoryType.INCOME,
					"category": "5f6bd332fb5bce16e339d783",
					"value": 1200
				},
				{
					"type": CategoryType.INCOME,
					"category": "5f6bd332fb5bce16e339d784",
					"value": 200
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f84db493301f64c4281482c",
					"value": 300
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d77a",
					"value": 250
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d779",
					"value": 250
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d77c",
					"value": 500
				},
				{
					"type": CategoryType.EXPENSE,
					"category": "5f6bd332fb5bce16e339d77e",
					"value": 120
				}
			],
			// user: user.id
		})
		plannings.push(p1, p2)
	})

	it('should listPlanningsByUser', async () => {
		const listedPlannings = await planUcs.listPlanningsByUser(user.id)
		expect(listedPlannings.length).toEqual(2)
	})

	it('should findPlanningById', async () => {
		const planning = await planUcs.findPlanningById(user.id, plannings[0].id)
		expect(planning.id).toEqual(plannings[0].id)
	})

	it('should deletePlanning', async () => {
		await planUcs.deletePlanning(user.id, plannings.pop().id)
		const listedPlannings = await planUcs.listPlanningsByUser(user.id)
		expect(listedPlannings.length).toEqual(1)
	})

	it('should editPlanning', async () => {
		const editedPlanning = await planUcs.editPlanning(user.id, plannings[0].id, { month: 12 })
		expect(editedPlanning.month).toEqual(12)
	})
	
	afterAll(async () => {
		await UserModel.findByIdAndDelete(user.id)
	})

})