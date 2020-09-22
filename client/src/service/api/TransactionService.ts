import client from "./ApiService";
import { Transaction, Account, User } from "@/models";
import { AxiosResponse } from "axios";

interface TransactionResponse {
  transaction: Transaction
}

class TransactionService {
  getAccountsTransactions(accountIds: Account["id"][]) {
    return client.get("/transactions", {
      params: { accounts: accountIds }
    });
  }

  async getUserTransactions() {
    return await (await client.get(`/transactions`)).data.transactions;
  }

  async getTransaction(transactionId: string) {
    return (await client.get<TransactionResponse>(`/transaction/${transactionId}`)).data.transaction;
  }

  async createTransaction(data: Transaction) {
    const transaction = {
      ...data,
      categories: data.categories.map(c => c.id)
    }
    return (await client.post("/transactions", { transaction })).data.transaction;
  }

  async updateTransaction(transaction: Transaction) {
    return (await client.put(`/transaction/${transaction.id}`, { transaction })).data.transaction;
  }

  deleteTransaction(transactionId: string) {
    return client.delete(`/transaction/${transactionId}`);
  }
}

export default new TransactionService();
