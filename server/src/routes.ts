import { Router } from 'express'
import AuthController from './controllers/AuthController'
import AccountController from './controllers/AccountController'
import UserController from './controllers/UserController'
import UserAccountController from './controllers/UserAccountController'
import TransactionController from './controllers/TransactionController'
import IndexController from './controllers/IndexController'
import passport from 'passport'
import InstitutionController from './controllers/InstitutionController'
import CategoryController from './controllers/CategoryController'

const router = Router()

router.get('/', IndexController.index)

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.loginAuth)
router.post('/auth/login-user', AuthController.login)
router.get('/auth/profile', passport.authenticate('jwt', { session: false }), (req, res) => res.send(req['user']))

router.get('/users', UserController.index)
router.get('/user/:id', UserController.find)
router.post('/users', UserController.store)
router.delete('/user/:userId', UserController.delete)
router.put('/user/:userId', UserController.update)
router.get('/user/:userId/transactions', TransactionController.findByUser)

router.get('/user/:userId/accounts', UserAccountController.index)
router.post('/user/:userId/accounts', UserAccountController.store)
router.put('/user/:userId/account/:accountId', UserAccountController.update)
// router.delete('/user/:userId/account/:accountId', UserAccountController.delete)

router.get('/transactions', TransactionController.index)
router.get('/transaction/:transactionId', TransactionController.find)
router.put('/transaction/:transactionId', TransactionController.update)
router.post('/transaction', TransactionController.store)
router.post('/transactions', TransactionController.store)
router.delete('/transaction/:transactionId', TransactionController.remove)

router.get('/accounts', AccountController.index)
router.delete('/accounts/:accountId', AccountController.delete)
router.get('/accounts/:accountId/transactions', TransactionController.findByAccount)
router.post('/accounts', AccountController.store)
router.put('/account/:accountId', AccountController.put)
router.get('/account/:accountId/balance', AccountController.balance)

router.get('/institutions', InstitutionController.index)
router.get('/institutions/type/:type', InstitutionController.findByType)
router.get('/institution/:institutionId', InstitutionController.find)
router.delete('/institution/:institutionId', InstitutionController.delete)
router.post('/institutions', InstitutionController.store)
router.delete('/institutions', InstitutionController.deleteMany)

router.get('/categories', CategoryController.index)
router.get('/category/:categoryId', CategoryController.find)
router.post('/categories', CategoryController.store)

export default router
