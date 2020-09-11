import accountRepository from './account.repository'
import institutionRepository from './institution.repository'
import userRepository from './user.repository'
import { Repositories } from '..'

const repository: Repositories = {
	account: accountRepository,
	budget: null,
	budgetGroup: null,
	category: null,
	institution: institutionRepository,
	user: userRepository,
	transaction: null,
}

export default repository
