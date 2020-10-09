import accountRepository from './account.repository'
import institutionRepository from './institution.repository'
import userRepository from './user.repository'
import { Repositories } from '..'
import categoryRepository from './category.repository'
import budgetRepository from './budget.repository'
import transactionRepository from './transaction.repository'
import groupRepository from './group.repository'

const repository: Repositories = {
	account: accountRepository,
	budget: budgetRepository,
	group: groupRepository,
	category: categoryRepository,
	institution: institutionRepository,
	user: userRepository,
	transaction: transactionRepository,
}

export default repository
