import { Module, VuexModule } from 'vuex-module-decorators'
import { Account } from '../../models/Account'
import { ICategory } from './Category'

export type ITransaction = {
    amount?: number,
    date?: Date,
    account: Account,
    category: ICategory,
    type: ITransactionType
  
    createdAt?: string,
    updatedAt?: string,
}

export type ITransactionType = {
    amount?: number,
    date?: Date,
    account: Account,
    category: ICategory,
    type: ITransactionType
  
    createdAt?: string,
    updatedAt?: string,
}

@Module({ name: 'Transactions', namespaced: true })
export default class TransactionsModule extends VuexModule {
    transactions: Array<ITransaction> = []
}