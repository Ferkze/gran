import client from "./ApiService";
import { Transaction, Account, User } from "@/models";
import { AxiosResponse } from "axios";

class TransactionService {
  getAccountsTransactions(accountIds: Account["id"][]) {
    return client.get("/transactions", {
      params: {
        accounts: accountIds,
      },
    });
  }

  getUserTransactions(userId: User["id"]) {
    return client.get(`/user/${userId}/transactions`);
  }

  getTransaction(
    transactionId: string
  ): Promise<AxiosResponse<Transaction | null>> {
    return client.get<Transaction | null>(`/transaction/${transactionId}`);
  }

  createTransaction(transaction: Transaction) {
    return client.post("/transaction", { transaction });
  }

  updateTransaction(transaction: Transaction) {
    return client.put(`/transaction/${transaction.id}`, { transaction });
  }

  deleteTransaction(transactionId: string) {
    return client.delete<Transaction | Error>(`/transaction/${transactionId}`);
  }
}

export default new TransactionService();
