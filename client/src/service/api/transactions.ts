import client from '.'
import { Transaction, Account, User } from '@/models'
import { AxiosResponse } from 'axios'

export const getAccountsTransactions = (accountIds: Account['_id'][]) => {
	return client.get('/transactions', {
		params: {
			accounts: accountIds
		}
	})
}

export const getUserTransactions = (userId: User['_id']) => {
	return client.get(`/user/${userId}/transactions`)
}

export const getTransaction = (transactionId: string): Promise<AxiosResponse<Transaction | null>> => {
	return client.get<Transaction | null>(`/transaction/${transactionId}`)
}

export const createTransaction = (transaction: Transaction) => {
	return client.post('/transaction', { transaction })
}

export const updateTransaction = (transaction: Transaction) => {
	return client.put(`/transaction/${transaction._id}`, { transaction })
}

export const deleteTransaction = (transactionId: string) => {
	return client.delete<Transaction | Error>(`/transaction/${transactionId}`)
}
