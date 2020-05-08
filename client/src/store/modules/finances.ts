import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../../service/api/account'
import auth from './auth'
import { IAccount, ITransaction } from '@/models'
import {
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
  createTransaction
} from '@/service/api/transactions'

@Module({
  store,
  dynamic: true,
  namespaced: true,
  name: 'finances'
})
class FinancesModule extends VuexModule {
  accounts: IAccount[] = []
  transactions: ITransaction[] = []

  get accountIds() {
    return this.accounts.map(a => a._id)
  }

  @Action({ commit: 'setAccounts', rawError: true })
  async fetchAccounts(): Promise<IAccount[] | null> {
    if (!auth.user || !auth.user._id) {
      return []
    }
    return (await getAccounts(auth.user._id)).data
  }

  @Action({ commit: 'addAccount', rawError: true })
  async newAccount(account: IAccount): Promise<IAccount | null> {
    if (!auth.user || !auth.user._id) {
      return null
    }
    account.owner = auth.user._id
    return (await createAccount(auth.user._id, account)).data
  }

  @Action({ commit: 'replaceAccount', rawError: true })
  async changeAccount(account: IAccount): Promise<IAccount | null> {
    if (!auth.user || !auth.user._id) {
      return null
    }
    return (await updateAccount(auth.user._id, account)).data
  }

  @Action({ commit: 'removeAccount', rawError: true })
  async deleteAccount(account: IAccount): Promise<IAccount | null> {
    if (!auth.user || !auth.user._id || !account._id) {
      return null
    }
    return (await deleteAccount(auth.user._id, account._id)).data
  }

  @Action({ commit: 'setTransactions', rawError: true })
  async fetchTransactions(): Promise<ITransaction[] | null> {
    if (!auth.user || !auth.user._id) {
      return []
    }
    return (await getUserTransactions(auth.user._id)).data
  }

  @Action({ commit: 'addTransaction', rawError: true })
  async newTransaction(transaction: ITransaction): Promise<ITransaction | null> {
    if (!auth.user || !auth.user._id) {
      return null
    }
    transaction.creator = auth.user._id
    return (await createTransaction(transaction)).data
  }

  @Action({ commit: 'replaceTransaction', rawError: true })
  async changeTransaction(transaction: ITransaction): Promise<ITransaction | null> {
    if (!auth.user || !auth.user._id) {
      return null
    }
    return (await updateTransaction(transaction)).data
  }

  @Action({ commit: 'removeTransaction', rawError: true })
  async deleteTransaction(transaction: ITransaction): Promise<ITransaction | null> {
    if (!auth.user || !auth.user._id || !transaction._id) {
      return null
    }
    return (await deleteTransaction(transaction._id)).data
  }

  @Mutation
  setAccounts(accounts: IAccount[]) {
    this.accounts = accounts
  }

  @Mutation
  addAccount(account: IAccount) {
    this.accounts.push(account)
  }

  @Mutation
  replaceAccount(account: IAccount) {
    const index = this.accounts.findIndex(a => a._id == account._id)
    this.accounts.splice(index, 1, account)
  }

  @Mutation
  removeAccount(account: IAccount) {
    const index = this.accounts.findIndex(a => a._id == account._id)
    this.accounts.splice(index, 1)
  }

  @Mutation
  setTransactions(transactions: ITransaction[]) {
    this.transactions = transactions
  }

  @Mutation
  addTransaction(transaction: ITransaction) {
    this.transactions.push(transaction)
  }

  @Mutation
  replaceTransaction(transaction: ITransaction) {
    const index = this.transactions.findIndex(a => a._id == transaction._id)
    this.transactions.splice(index, 1, transaction)
  }

  @Mutation
  removeTransaction(transaction: ITransaction) {
    const index = this.transactions.findIndex(a => a._id == transaction._id)
    this.transactions.splice(index, 1)
  }
}

export default getModule(FinancesModule)
