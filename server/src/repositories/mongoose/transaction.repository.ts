import { TransactionRepository } from '..'
import { Transaction } from '../../models/entities/Transaction'
import TransactionModel, { ITransaction } from './models/TransactionModel'

class MongooseTransactionRepository implements TransactionRepository {
	async getAllTransactions(): Promise<Transaction[]> {
		const docs = await TransactionModel.find()
		return MongooseTransactionRepository.deserializeTransactions(docs)
	}
	async getAllUserTransactions(userId: string): Promise<Transaction[]> {
		const docs = await TransactionModel.find({ user: userId })
		return MongooseTransactionRepository.deserializeTransactions(docs)
	}
	async getAllAccountTransactions(accountId: string): Promise<Transaction[]> {
		const docs = await TransactionModel.find({ account: accountId }).exec()
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
			paid: transaction.paid,
			description: transaction.description,
			account: transaction.account,
			category: transaction.category,
			type: transaction.type,
			user: transaction.user,
			// group: transaction.group,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
		}
	}
	
	static deserializeTransactions(transactions: ITransaction[]): Transaction[] {
		return transactions.map(t => MongooseTransactionRepository.deserializeTransaction(t))
	}

}

export default new MongooseTransactionRepository()