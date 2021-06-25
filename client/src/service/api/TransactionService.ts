import client from "./ApiService";
import { Transaction, Account, Group, TransactionFilter } from "@/models";

interface TransactionResponse {
  transaction: Transaction
  error?: string
}

interface TransactionsResponse {
  transactions: Transaction[]
  error?: string
}

class TransactionService {
	async getAccountTransactions(accountId: Account["id"]) {
		const response = await client.get("/api/transactions/filter", {
			params: { account: accountId }
		})
		return response.data.transactions;
	}

	async getUserTransactions() {
		const response = await client.get(`/api/transactions`)
		return response.data.transactions;
	}

	async getTransactions(filter: TransactionFilter) {
		const response = await client.get<TransactionsResponse>('/api/transactions/filter', { params: filter })
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.transactions
	}

	async getTransaction(transactionId: string) {
		const response  = await client.get<TransactionResponse>(`/api/transactions/${transactionId}`)
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.transaction;
	}

	async getTransactionsByGroup(groupId: Group['id']) {
		const response = await client.get<TransactionsResponse>('/api/transactions/filter', { params: { group: groupId } })
		if (response.data.error) {
			throw new Error(response.data.error)
		}
		return response.data.transactions
	}

	async createTransaction(transaction: Transaction) {
		const response = await client.post("/api/transactions", { transaction })
		return response.data.transaction;
	}

	async updateTransaction(transaction: Transaction) {
		const response = await client.put(`/api/transactions/${transaction.id}`, { transaction })
		return response.data.transaction;
	}

	async deleteTransaction(transactionId: string) {
		return await client.delete(`/api/transactions/${transactionId}`);
	}
}

export default new TransactionService();
