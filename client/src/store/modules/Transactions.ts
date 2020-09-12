import {
  Module,
  VuexModule,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import { Transaction } from "@/models";
import store from "..";
import auth from "./auth";
import TransactionService from "@/service/api/TransactionService";

@Module({
  store,
  dynamic: true,
  name: "transactions",
  namespaced: true,
})
class TransactionsModule extends VuexModule {
  transactions: Array<Transaction> = [];

  @Action({ commit: "setTransactions", rawError: true })
  async fetchTransactions(): Promise<Transaction[] | null> {
    if (!auth.user || !auth.user.id) {
      return [];
    }
    return (await TransactionService.getUserTransactions(auth.user.id)).data;
  }

  @Action({ commit: "addTransaction", rawError: true })
  async newTransaction(transaction: Transaction): Promise<Transaction | null> {
    if (!auth.user || !auth.user.id) {
      return null;
    }
    transaction.creator = auth.user.id;
    return (await TransactionService.createTransaction(transaction)).data;
  }

  @Action({ commit: "replaceTransaction", rawError: true })
  async changeTransaction(
    transaction: Transaction
  ): Promise<Transaction | null> {
    if (!auth.user || !auth.user.id) {
      return null;
    }
    return (await TransactionService.updateTransaction(transaction)).data;
  }

  @Action({ commit: "removeTransaction", rawError: true })
  async deleteTransaction(
    transaction: Transaction
  ): Promise<Transaction | null> {
    if (!auth.user || !auth.user.id || !transaction.id) {
      return null;
    }
    await TransactionService.deleteTransaction(transaction.id);
    return transaction;
  }

  @Mutation
  setTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  @Mutation
  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  @Mutation
  replaceTransaction(transaction: Transaction) {
    const index = this.transactions.findIndex((a) => a.id == transaction.id);
    this.transactions.splice(index, 1, transaction);
  }

  @Mutation
  removeTransaction(transaction: Transaction) {
    const index = this.transactions.findIndex((a) => a.id == transaction.id);
    this.transactions.splice(index, 1);
  }
}

export default getModule(TransactionsModule);
