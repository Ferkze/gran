import accountRepository from './account.repository'
import institutionRepository from './institution.repository'
import userRepository from './user.repository'
import { Repositories } from '..'
import categoryRepository from './category.repository'
import budgetRepository from './budget.repository'
import transactionRepository from './transaction.repository'

const repository: Repositories = {
	account: accountRepository,
	budget: budgetRepository,
	group: null,
	category: categoryRepository,
	institution: institutionRepository,
	user: userRepository,
	transaction: transactionRepository,
}

export default repository
