import client from "./ApiService";
import { Account } from "@/models";

interface AccountsResponse {
  accounts: Account[]
}

class AccountService {
  async getAccounts () {
    return await (await client.get<AccountsResponse>(`/accounts`)).data.accounts;
  };
  
  createAccount (userId: string, account: Account) {
    console.log('userId', userId)
    console.log('account', account)
    account.id = '123123123'
    return account
    return // client.post(`/accounts`, { account });
  };
  
  updateAccount (userId: string, account: Account) {
    return client.put(`/account/${account.id}`, { account });
  };
  
  deleteAccount (accountId: string) {
    return client.delete(`/accounts/${accountId}`);
  };

  async getAccountBalance(accountId: Account['id']) {
    const response = await client.get(`/account/${accountId}/balance`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.balance
  }

}

export default  new AccountService()