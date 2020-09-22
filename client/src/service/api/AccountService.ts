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
    return client.post(`/accounts`, { account });
  };
  
  updateAccount (userId: string, account: Account) {
    return client.put(`/account/${account.id}`, { account });
  };
  
  deleteAccount (accountId: string) {
    return client.delete(`/accounts/${accountId}`);
  };

}

export default  new AccountService()