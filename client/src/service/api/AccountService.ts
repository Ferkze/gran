import client from "./ApiService";
import { Account } from "@/models";

interface AccountsResponse {
  accounts: Account[]
}

class AccountService {
  async getAccounts () {
    return await (await client.get<AccountsResponse>(`/api/accounts`)).data.accounts;
  };
  
  async createAccount (userId: string, account: Account) {
    const response = await client.post(`/api/accounts`, { account })
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.account
  };
  
  updateAccount (userId: string, account: Account) {
    return client.put(`/api/account/${account.id}`, { account });
  };
  
  deleteAccount (accountId: string) {
    return client.delete(`/api/accounts/${accountId}`);
  };

  async getAccountBalance(accountId: Account['id']) {
    const response = await client.get(`/api/account/${accountId}/balance`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.balance
  }

}

export default  new AccountService()