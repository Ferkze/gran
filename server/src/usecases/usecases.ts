import { Repositories } from '../repositories'
import { Usecases, InstitutionUsecases, AuthUsecases, AccountUsecases, UserUsecases, BudgetUsecases, BudgetGroupUsecases, CategoryUsecases, TransactionUsecases } from '.'
import { InstitutionUsecasesImpl } from './institution.usecases'
import { AuthUsecasesImpl } from './auth.usecases'
import { UserUsecasesImpl } from './user.usecases'
import { AccountUsecasesImpl } from './account.usecases'
import { TransactionUsecasesImpl } from './transaction.usecases'
import { CategoryUsecasesImpl } from './category.usecases'
import { BudgetGroupUsecasesImpl } from './budgetGroup.usecases'
import { BudgetUsecasesImpl } from './budget.usecases'

export class UsecasesImpl implements Usecases {
	
	accountUsecases: AccountUsecases
	authUsecases: AuthUsecases
	budgetUsecases: BudgetUsecases
	budgetGroupUsecases: BudgetGroupUsecases
	categoryUsecases: CategoryUsecases
	instutionUsecases: InstitutionUsecases
	userUsecases: UserUsecases
	transactionUsecases: TransactionUsecases

	constructor(private repo: Repositories) {
		this.accountUsecases = new AccountUsecasesImpl(repo)
		this.authUsecases = new AuthUsecasesImpl(repo)
		this.budgetUsecases = new BudgetUsecasesImpl(repo)
		this.budgetGroupUsecases = new BudgetGroupUsecasesImpl(repo)
		this.categoryUsecases = new CategoryUsecasesImpl(repo)
		this.transactionUsecases = new TransactionUsecasesImpl(repo)
		this.instutionUsecases = new InstitutionUsecasesImpl(repo)
		this.userUsecases = new UserUsecasesImpl(repo)
	}

	listTransactions(): void {
		throw new Error('Method not implemented.')
	}
	listCategories(): void {
		throw new Error('Method not implemented.')
	}
	listBudgets(): void {
		throw new Error('Method not implemented.')
	}
	listBudgetGroups(): void {
		throw new Error('Method not implemented.')
	}
	registerTransaction(): void {
		throw new Error('Method not implemented.')
	}
	registerCategory(): void {
		throw new Error('Method not implemented.')
	}
	registerBudget(): void {
		throw new Error('Method not implemented.')
	}
	registerBudgetGroup(): void {
		throw new Error('Method not implemented.')
	}
	joinBudgetGroup(): void {
		throw new Error('Method not implemented.')
	}
}
