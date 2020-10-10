import { Router } from 'express'
import {
	accountController,
	authController,
	balanceController,
	budgetController,
	categoryController,
	groupController,
	indexController,
	institutionController,
	transactionController,
	userController
} from './controllers'
import authenticationMiddleware from './middlewares/authentication.middleware'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'

const router = Router()

router.get('/', indexController.index)

router.post('/auth/login', authController.login) // OK
router.post('/auth/register', authController.register) // OK
router.get('/auth/current', authController.current) // OK

// Dados do usuário, precisa estar autenticado para acesser os dados de usuários
// router.get('/users', userController.index)
router.get('/user/:userId', userController.readById)
// router.post('/users', userController.store)
// router.delete('/user/:userId', userController.delete)
router.put('/user', authenticationMiddleware.userRequired, userController.update)

// Precisam de autenticação, para que as transações do usuário sejam encontradas
router.get('/transactions', authenticationMiddleware.userRequired, transactionController.readByUser) // OK
// router.get('/transaction/:transactionId', authenticationMiddleware.userRequired, transactionController.find)
router.post('/transactions', authenticationMiddleware.userRequired, transactionController.create) // OK
router.put('/transaction/:transactionId', authenticationMiddleware.userRequired, transactionController.update) // OK
// router.post('/transaction', authenticationMiddleware.userRequired, transactionController.store)
// router.delete('/transaction/:transactionId', authenticationMiddleware.userRequired, transactionController.remove)
// Precisam de autenticação, para que as transações do usuário sejam encontradas

router.get('/balance', authenticationMiddleware.userRequired, balanceController.index)

// Precisam de autenticação, para que as contas do usuário sejam encontradas
router.get('/accounts', authenticationMiddleware.userRequired, errorHandlerMiddleware.handleErr, accountController.index) // OK
router.post('/accounts', authenticationMiddleware.userRequired, errorHandlerMiddleware.handleErr, accountController.create) // OK
router.put('/accounts/:accountId', authenticationMiddleware.userRequired, accountController.update) // OK 
router.delete('/accounts/:accountId', authenticationMiddleware.userRequired, accountController.delete) // OK
router.get('/accounts/:accountId/balance', authenticationMiddleware.userRequired, accountController.balance) // OK
// router.get('/accounts/:accountId/transactions', authenticationMiddleware.userRequired, transactionController.findByAccount)

// Não precisam de autenticação, essas instituições são genéricas para o app
router.get('/institutions', institutionController.index)
// router.get('/institutions/type/:type', institutionController.findByType)
// router.get('/institution/:institutionId', institutionController.find)
// router.delete('/institution/:institutionId', institutionController.delete)
// router.post('/institutions', institutionController.store)
// router.delete('/institutions', institutionController.deleteMany)

// Não precisam de autenticação, uma vez que o usuário utiliza as categorias padrões
router.get('/categories', authenticationMiddleware.userRequired, categoryController.read)
// router.get('/category/:categoryId', authenticationMiddleware.userRequired, categoryController.find)
router.post('/categories', authenticationMiddleware.userRequired, categoryController.create)
router.put('/categories/:categoryId', authenticationMiddleware.userRequired, categoryController.update)

router.get('/budgets', authenticationMiddleware.userRequired, budgetController.readByUser)
router.post('/budgets', authenticationMiddleware.userRequired, budgetController.create)
router.put('/budgets/:budgetId', authenticationMiddleware.userRequired, budgetController.update)

router.get('/groups', authenticationMiddleware.userRequired, groupController.readByUser)
router.post('/groups', authenticationMiddleware.userRequired, groupController.create)
router.put('/groups/:groupId', authenticationMiddleware.userRequired, groupController.update)

export default router
