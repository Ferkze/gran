import { Module, VuexModule, getModule } from 'vuex-module-decorators'
import { ITransaction } from '@/models'
import store from '..'

@Module({
  store,
  dynamic: true,
  name: 'transactions',
  namespaced: true
})
class TransactionsModule extends VuexModule {
  transactions: Array<ITransaction> = []
}

export default getModule(TransactionsModule)
