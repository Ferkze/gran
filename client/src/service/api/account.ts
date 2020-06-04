import client from '.'
import { Account } from '@/models'

export const getAccounts = (userId: string) => {
	return client.get(`/user/${userId}/accounts`)
}

export const createAccount = (userId: string, account: Account) => {
	return client.post(`/user/${userId}/accounts`, { account })
}

export const updateAccount = (userId: string, account: Account) => {
	return client.put(`/user/${userId}/account/${account._id}`, { account })
}

export const deleteAccount = (userId: string, accountId: string) => {
	return client.delete(`/user/${userId}/account/${accountId}`)
}
