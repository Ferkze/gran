import { Module, VuexModule, getModule } from 'vuex-module-decorators'
import { Transaction } from '@/models'
import store from '..'

@Module({
	store,
	dynamic: true,
	name: 'transactions',
	namespaced: true
})
class TransactionsModule extends VuexModule {
	transactions: Array<Transaction> = []
}

export default getModule(TransactionsModule)
