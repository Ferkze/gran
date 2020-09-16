import { Repositories } from '../repositories'
import { Usecases, InstitutionUsecases, AuthUsecases, AccountUsecases, UserUsecases, BudgetUsecases, GroupUsecases, CategoryUsecases, TransactionUsecases } from '.'
import { InstitutionUsecasesImpl } from './institution.usecases'
import { AuthUsecasesImpl } from './auth.usecases'
import { UserUsecasesImpl } from './user.usecases'
import { AccountUsecasesImpl } from './account.usecases'
import { TransactionUsecasesImpl } from './transaction.usecases'
import { CategoryUsecasesImpl } from './category.usecases'
import { GroupUsecasesImpl } from './group.usecases'
import { BudgetUsecasesImpl } from './budget.usecases'

export class UsecasesImpl implements Usecases {
	
	account: AccountUsecases
	auth: AuthUsecases
	budget: BudgetUsecases
	category: CategoryUsecases
	group: GroupUsecases
	instution: InstitutionUsecases
	user: UserUsecases
	transaction: TransactionUsecases

	constructor(repo: Repositories) {
		this.account = new AccountUsecasesImpl(repo)
		this.auth = new AuthUsecasesImpl(repo)
		this.budget = new BudgetUsecasesImpl(repo)
		this.category = new CategoryUsecasesImpl(repo)
		this.group = new GroupUsecasesImpl(repo)
		this.transaction = new TransactionUsecasesImpl(repo)
		this.instution = new InstitutionUsecasesImpl(repo)
		this.user = new UserUsecasesImpl(repo)
	}

}
