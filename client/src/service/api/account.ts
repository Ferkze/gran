import client from '.'

export const getAccounts = (userId: string) => {
  return client.get(`/api/user/${userId}/accounts`)
}

export const createAccount = (userId: string, account: Account) => {
  return client.post(`/api/user/${userId}/accounts`, { account })
}

export const updateAccount = (userId: string, account: Account) => {
  return client.put(`/api/user/${userId}/account/${account.id}`, { account })
}
