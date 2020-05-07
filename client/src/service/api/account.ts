import client from '.'

export const getAccounts = (userId: string) => {
  return client.get(`/user/${userId}/accounts`)
}

export const createAccount = (userId: string, account: Account) => {
  return client.post(`/user/${userId}/accounts`, { account })
}

export const updateAccount = (userId: string, account: Account) => {
  return client.put(`/user/${userId}/account/${account.id}`, { account })
}
