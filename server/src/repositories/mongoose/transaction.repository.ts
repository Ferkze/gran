import { TransactionRepository } from '..'
import { Transaction, TransactionFilter } from '../../models/entities/Transaction'
import { User } from '../../models/entities/User'
import TransactionModel, { ITransaction } from './models/TransactionModel'

class MongooseTransactionRepository implements TransactionRepository {
	
	async getFilteredTransactions(filter: TransactionFilter): Promise<Transaction[]> {
		const query = {}

		if(filter.id)
			query['_id'] = filter.id
		if(filter.start || filter.end) {
			query['date'] = {}
			if(filter.start)
				query['date']['$gte'] = filter.start
			if(filter.end)
				query['date']['$lt'] = filter.end
		}
		if(filter.paid)
			query['paid'] = filter.paid
		if(filter.type)
			query['type'] = filter.type
		if(filter.account)
			query['account'] = filter.account
		if(filter.category)
			query['category'] = filter.category
		if(filter.user)
			query['user'] = filter.user
		if(filter.group)
			query['group'] = filter.group

		const docs = await TransactionModel.find(query)
		return docs.map(d => d.getTransaction())
	}

	async getAllUserTransactions(userId: string): Promise<Transaction[]> {
		const docs = await TransactionModel.find({ user: userId })
		return docs.map(d => d.getTransaction())
	}

	async getAllAccountTransactions(userId: string, accountId: string): Promise<Transaction[]> {
		const docs = await TransactionModel.find({ user: userId, account: accountId }).exec()
		return docs.map(d => d.getTransaction())
	}

	async findTransactionById(id: string): Promise<Transaction> {
		const doc = await TransactionModel.findById(id)
		return doc.getTransaction()
	}

	async saveTransaction(transaction: Transaction): Promise<Transaction> {
		const doc = await TransactionModel.create(transaction)
		return doc.getTransaction()
	}

	async updateTransaction(id: Transaction['id'], transaction: Transaction): Promise<Transaction> {
		await TransactionModel.update({ _id: id }, transaction)
		const doc = await TransactionModel.findById(id)
		return doc.getTransaction()
	}

	async deleteTransaction(userId: User['id'], transactionId: string): Promise<boolean> {
		const result = await TransactionModel.deleteOne({ _id: transactionId, user: userId })
		return result.deletedCount > 0
	}

}

export default new MongooseTransactionRepository()