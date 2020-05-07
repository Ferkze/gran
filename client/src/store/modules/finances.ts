import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAccounts, createAccount } from '../../service/api/account'
import auth from './auth'
import { IAccount } from '@/models/Account'

@Module({
  store,
  dynamic: true,
  namespaced: true,
  name: 'finances'
})
class FinancesModule extends VuexModule {
  accounts: IAccount[] = []

  @Action({ commit: 'setAccounts', rawError: true })
  async fetchAccounts() {
    if (!auth.user || !auth.user._id) {
      return []
    }
    return (await getAccounts(auth.user._id)).data
  }

  @Action({ commit: 'addAccount', rawError: true })
  async newAccount(account: Account) {
    if (!auth.user || !auth.user._id) {
      return []
    }
    return (await createAccount(auth.user._id, account)).data
  }

  @Mutation
  setAccounts(accounts: IAccount[]) {
    this.accounts = accounts
  }

  @Mutation
  addAccount(accounts: IAccount[]) {
    this.accounts = accounts
  }
}

export default getModule(FinancesModule)
