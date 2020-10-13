import database from "../config/database"
import { Account, AccountSubtypes, AccountTypes } from "../models/entities/Account"
import { Category, CategoryType } from "../models/entities/Category"
import { Group } from "../models/entities/Group"
import { Planning } from "../models/entities/Planning"
import { TransactionType } from "../models/entities/Transaction"
import { User } from "../models/entities/User"
import repositories from "../repositories"
import GroupModel from "../repositories/mongoose/models/GroupModel"
import UserModel from "../repositories/mongoose/models/UserModel"
import { AccountUsecasesImpl } from "./account.usecases"
import { AuthUsecasesImpl } from "./auth.usecases"
import { CategoryUsecasesImpl } from "./category.usecases"
import { GroupUsecasesImpl } from "./group.usecases"
import { InstitutionUsecasesImpl } from "./institution.usecases"
import { PlanningUsecasesImpl } from "./planning.usecases"
import { TransactionUsecasesImpl } from "./transaction.usecases"

describe('Groups usecases', () => {

	const authUcs = new AuthUsecasesImpl(repositories)
	const accountUcs = new AccountUsecasesImpl(repositories)
	const instUcs = new InstitutionUsecasesImpl(repositories)
	// const tranUcs = new TransactionUsecasesImpl(repositories)
	const catsUcs = new CategoryUsecasesImpl(repositories)
	// const planUcs = new PlanningUsecasesImpl(repositories)
	const groupUcs = new GroupUsecasesImpl(repositories)
	
	let user1!: User
	let user2!: User
	let account!: Account
	let categories: Category[] = []
	let plannings: Planning[] = []
	let group1: Group = null
	let group2: Group = null

	beforeAll(async () => {
		require('dotenv').config({
			path: '.env.test'
		})
		await database()

		user1 = await authUcs.register({
			email: 'group1@test.com',
			name: 'Teste group1',
			password: '123456',
			password2: '123456'
		})
		user2 = await authUcs.register({
			email: 'group2@test.com',
			name: 'Teste group2',
			password: '123456',
			password2: '123456'
		})
		categories = await catsUcs.listCategories()
		let institutions = await instUcs.listInstitutions()
		account = await accountUcs.registerAccount(user1.id, {
			name: 'NuBanco',
			main: false,
			institution: institutions[0].id,
			unregisteredInstitution: '',
			type: AccountTypes.DEBIT,
			subtype: AccountSubtypes.CURRENT,
			startingBalance: 200.5,
			owner: user1.id
		})
	})

	it('should register groups', async () => {
		group1 = await groupUcs.registerGroup(user1.id, {
			name: 'Familia dos grupos',
			plannings: []
		})
		expect(group1.id).toBeDefined()
	})

	it('should register groups', async () => {
		group2 = await groupUcs.registerGroup(user2.id, {
			name: 'Familia dos grupos',
			members: [
				user1.id
			],
			plannings: []
		})
		expect(group2.id).toBeDefined()
	})

	it('should list user groups', async () => {
		const groups1 = await groupUcs.listGroups(user1.id)
		const groups2 = await groupUcs.listGroups(user2.id)

		expect(groups1.length).toBe(2)
		expect(groups2.length).toBe(1)
	})
	
	afterAll(async () => {
		await UserModel.findByIdAndDelete(user1.id)
		await UserModel.findByIdAndDelete(user2.id)
		await GroupModel.findByIdAndDelete(group1.id)
		await GroupModel.findByIdAndDelete(group2.id)
	})

})