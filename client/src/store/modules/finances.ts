import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAccounts, createAccount } from '../../service/api/account'
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

  @Mutation
  setAccounts(accounts: IAccount[]) {
    this.accounts = accounts
  }

  @Mutation
  addAccount(account: IAccount) {
    this.accounts.push(account)
  }
}

export default getModule(FinancesModule)
