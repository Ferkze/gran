import client from "./ApiService";
import { Transaction, Account, Group, TransactionFilter } from "@/models";

interface TransactionResponse {
  transaction: Transaction
}

interface TransactionsResponse {
  transactions: Transaction[]
  error?: string
}

class TransactionService {
  getAccountsTransactions(accountIds: Account["id"][]) {
    return client.get("/api/transactions", {
      params: { accounts: accountIds }
    });
  }

  async getUserTransactions() {
    return await (await client.get(`/api/transactions`)).data.transactions;
  }

  async getTransactions(filter: TransactionFilter) {
    const response = await client.get<TransactionsResponse>('/api/transactions', { params: filter })
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.transactions
  }

  async getTransaction(transactionId: string) {
    return (await client.get<TransactionResponse>(`/api/transaction/${transactionId}`)).data.transaction;
  }

  async getTransactionsByGroup(groupId: Group['id']) {
    const response = await client.get<TransactionsResponse>('/api/transactions', { params: { group: groupId } })
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.transactions
  }

  async createTransaction(transaction: Transaction) {
    return (await client.post("/api/transactions", { transaction })).data.transaction;
  }

  async updateTransaction(transaction: Transaction) {
    return (await client.put(`/api/transaction/${transaction.id}`, { transaction })).data.transaction;
  }

  async deleteTransaction(transactionId: string) {
    return await client.delete(`/api/transactions/${transactionId}`);
  }
}

export default new TransactionService();
