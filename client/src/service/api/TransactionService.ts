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

  async createTransaction(transaction: Transaction) {
    return (await client.post("/transactions", { transaction })).data.transaction;
  }

  async updateTransaction(transaction: Transaction) {
    return (await client.put(`/transaction/${transaction.id}`, { transaction })).data.transaction;
  }

  async deleteTransaction(transactionId: string) {
    return await client.delete(`/transactions/${transactionId}`);
  }
}

export default new TransactionService();
