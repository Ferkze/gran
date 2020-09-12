import accountRepository from './account.repository'
import institutionRepository from './institution.repository'
import userRepository from './user.repository'
import { Repositories } from '..'
import categoryRepository from './category.repository'

const repository: Repositories = {
	account: accountRepository,
	budget: null,
	budgetGroup: null,
	category: categoryRepository,
	institution: institutionRepository,
	user: userRepository,
	transaction: null,
}

export default repository
