import { Request, Response } from 'express'
import usecases from '../usecases'

class AccountController {
	public async index(req: Request, res: Response): Promise<Response> {
		try {
			const accounts = await usecases.account.listAccounts()
			return res.status(200).json(accounts)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
	public async find(req: Request, res: Response): Promise<Response> {
		// const account = await Account.findOne({
		// 	_id: req.params.accountId
		// }).populate('institution')
  
		// return res.json(account)
		return res.json(null)
	}
	public async store(req: Request, res: Response): Promise<Response> {
		// const account = req.body as AccountModel
		// const doc = await Account.create(account)
		// return res.json(doc)
		return res.json(null)
	}
	public async put(req: Request, res: Response): Promise<Response> {
		// const { accountId } = req.params
		// const account = req.body as AccountModel
		// console.info(`Received ${accountId} account data for updating: ${account}`)
		// const doc = await Account.findByIdAndUpdate(accountId, account, { new: true })
		// return res.json(doc)
		return res.json(null)
	}
	public async delete(req: Request, res: Response): Promise<Response> {
		// const { accountId } = req.params
		// const account = await Account.findByIdAndDelete(accountId)
		// return res.json(account)
		return res.json(null)
	}

	public async balance(req: Request, res: Response): Promise<Response> {
		// const { accountId } = req.params
		// const transactions = await Transaction.find().byAccount(accountId)
		// const balance = transactions.reduce((total, cur) => {
		// 	switch (cur.type) {
		// 	case TransactionType.CREDIT:
		// 		total -= cur.amount
		// 		break
		// 	case TransactionType.DEBIT:
		// 		total += cur.amount
		// 		break
		// 	case TransactionType.TRANSFERENCE:
		// 		if (cur.debitAccount == accountId)
		// 			total += cur.amount
		// 		break
		// 	default:
		// 		console.warn('Transaction without type:', cur)
		// 	}
		// 	return total
		// }, 0)
		// return res.json(balance)
		return res.json(null)
	}
}

export default new AccountController()