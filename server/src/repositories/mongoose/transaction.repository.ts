import { TransactionRepository } from '..'
import { Transaction } from '../../models/entities/Transaction'
import { MongooseCategoryRepository } from './category.repository'
import TransactionModel, { ITransaction } from './models/TransactionModel'

class MongooseTransactionRepository implements TransactionRepository {
	async getAllTransactions(): Promise<Transaction[]> {
		const docs = await TransactionModel.find().populate('categories')
		return MongooseTransactionRepository.deserializeTransactions(docs)
	}
	async getAllUserTransactions(userId: string): Promise<Transaction[]> {
		const docs = await TransactionModel.find({ creator: userId }).populate('categories')
		return MongooseTransactionRepository.deserializeTransactions(docs)
	}
	async getAllAccountTransactions(accountId: string): Promise<Transaction[]> {
		const docs = await TransactionModel.byAccount(accountId)
		return MongooseTransactionRepository.deserializeTransactions(docs)
	}
	async findTransactionById(id: string): Promise<Transaction> {
		const doc = await TransactionModel.findById(id)
		return MongooseTransactionRepository.deserializeTransaction(doc)
	}
	async saveTransaction(transaction: Transaction): Promise<Transaction> {
		const doc = await TransactionModel.create(transaction)
		return MongooseTransactionRepository.deserializeTransaction(doc)
	}
	async updateTransaction(id: Transaction['id'], transaction: Transaction): Promise<Transaction> {
		const doc = await TransactionModel.update({ _id: id }, transaction)
		return MongooseTransactionRepository.deserializeTransaction(doc)
	}
	async deleteTransaction(transactionId: string): Promise<void> {
		await TransactionModel.deleteOne({ _id: transactionId })
	}

	static deserializeTransaction(transaction: ITransaction): Transaction {
		return {
			id: transaction.id,
			amount: transaction.amount,
			date: transaction.date,
			description: transaction.description,
			account: transaction.account,
			categories: MongooseCategoryRepository.deserializeCategories(transaction.categories),
			type: transaction.type,
			creator: transaction.creator,
			group: transaction.group,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
		}
	}
	
	static deserializeTransactions(transactions: ITransaction[]): Transaction[] {
		return transactions.map(t => MongooseTransactionRepository.deserializeTransaction(t))
	}

}

export default new MongooseTransactionRepository()