import { TransactionRepository } from '..'
import { Transaction } from '../../models/entities/Transaction'

class MongooseTransactionRepository implements TransactionRepository {
	getAllTransactions(): Promise<Transaction[]> {
		throw new Error('Method not implemented.')
	}
	getAllUserTransactions(userId: string): Promise<Transaction[]> {
		throw new Error('Method not implemented.')
	}
	getAllAccountTransactions(accountId: string): Promise<Transaction[]> {
		throw new Error('Method not implemented.')
	}
	findTransactionById(id: string): Promise<Transaction> {
		throw new Error('Method not implemented.')
	}
	saveTransaction(transaction: Transaction): Promise<Transaction> {
		throw new Error('Method not implemented.')
	}
	updateTransaction(transaction: Transaction): Promise<Transaction> {
		throw new Error('Method not implemented.')
	}
	deleteTransaction(transactionId: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
	

}

export default new MongooseTransactionRepository()