import repositories from '../repositories'
import { UsecasesImpl } from '../usecases/usecases'
import AccountController from './account.controller'
import AuthController from './auth.controller'
import BalanceController from './balance.controller'
import BudgetController from './budget.controller'
import CategoryController from './category.controller'
import GroupController from './group.controller'
import IndexController from './index.controller'
import InstitutionController from './institution.controller'
import PlanningController from './planning.controller'
import TransactionController from './transaction.controller'
import UserController from './user.controller'

const usecasesImpl = new UsecasesImpl(repositories)

export const accountController = new AccountController(usecasesImpl)
export const authController = new AuthController(usecasesImpl)
export const balanceController = new BalanceController(usecasesImpl)
export const budgetController = new BudgetController(usecasesImpl)
export const categoryController = new CategoryController(usecasesImpl)
export const groupController = new GroupController(usecasesImpl)
export const indexController = new IndexController(usecasesImpl)
export const institutionController = new InstitutionController(usecasesImpl)
export const planningController = new PlanningController(usecasesImpl)
export const transactionController = new TransactionController(usecasesImpl)
export const userController = new UserController(usecasesImpl)