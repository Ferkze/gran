import client from '.'
import { IAccount } from '@/models'

export const getAccounts = (userId: string) => {
  return client.get(`/user/${userId}/accounts`)
}

export const createAccount = (userId: string, account: IAccount) => {
  return client.post(`/user/${userId}/accounts`, { account })
}

export const updateAccount = (userId: string, account: IAccount) => {
  return client.put(`/user/${userId}/account/${account._id}`, { account })
}
