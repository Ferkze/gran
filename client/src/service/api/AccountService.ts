import client from "./ApiService";
import { Account } from "@/models";

interface AccountsResponse {
  accounts: Account[]
  error?: string
}

class AccountService {
  async getAccounts () {
    const response = await client.get<AccountsResponse>(`/api/accounts`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.accounts
  };
  
  async createAccount (userId: string, account: Account) {
    const response = await client.post(`/api/accounts`, { account })
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.account
  };
  
  async updateAccount (userId: string, account: Account) {
    const response = await client.put(`/api/accounts/${account.id}`, { account });
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.account
  };
  
  async deleteAccount (accountId: string) {
    const response = await client.delete(`/api/accounts/${accountId}`);
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.account
  };

  async getAccountBalance(accountId: Account['id']) {
    const response = await client.get(`/api/accounts/${accountId}/balance`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.balance
  }

}

export default  new AccountService()