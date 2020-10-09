import usecases from '../usecases'
import AccountController from './account.controller'
import AuthController from './auth.controller'
import BalanceController from './balance.controller'
import BudgetController from './budget.controller'
import CategoryController from './category.controller'
import GroupController from './group.controller'
import IndexController from './index.controller'
import InstitutionController from './institution.controller'
import TransactionController from './transaction.controller'
import UserController from './user.controller'

export const accountController = new AccountController(usecases)
export const authController = new AuthController(usecases)
export const balanceController = new BalanceController(usecases)
export const budgetController = new BudgetController(usecases)
export const categoryController = new CategoryController(usecases)
export const groupController = new GroupController(usecases)
export const indexController = new IndexController(usecases)
export const institutionController = new InstitutionController(usecases)
export const transactionController = new TransactionController(usecases)
export const userController = new UserController(usecases)