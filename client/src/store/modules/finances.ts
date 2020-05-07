import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../../service/api/account'
import auth from './auth'
import { IAccount } from '@/models'

@Module({
  store,
  dynamic: true,
  namespaced: true,
  name: 'finances'
})
class FinancesModule extends VuexModule {
  accounts: IAccount[] = []

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
}

export default getModule(FinancesModule)
