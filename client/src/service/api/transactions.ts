import client from '.'
import { ITransaction, IAccount, User } from '@/models'
import { AxiosResponse } from 'axios'

export const getAccountsTransactions = (accountIds: IAccount['_id'][]) => {
  return client.get('/transactions', {
    params: {
      accounts: accountIds
    }
  })
}

export const getUserTransactions = (userId: User['_id']) => {
  return client.get(`/user/${userId}/transactions`)
}

export const getTransaction = (transactionId: string): Promise<AxiosResponse<ITransaction | null>> => {
  return client.get<ITransaction | null>(`/transaction/${transactionId}`)
}

export const createTransaction = (transaction: ITransaction) => {
  return client.post('/transaction', { transaction })
}

export const updateTransaction = (transaction: ITransaction) => {
  return client.put(`/transaction/${transaction._id}`, { transaction })
}

export const deleteTransaction = (transactionId: string) => {
  return client.delete(`/transaction/${transactionId}`)
}
