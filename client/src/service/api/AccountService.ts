import client from "./ApiService";
import { Account } from "@/models";

class AccountService {
  getAccounts (userId: string) {
    return client.get(`/user/${userId}/accounts`);
  };
  
  createAccount (userId: string, account: Account) {
    return client.post(`/user/${userId}/accounts`, { account });
  };
  
  updateAccount (userId: string, account: Account) {
    return client.put(`/user/${userId}/account/${account.id}`, { account });
  };
  
  deleteAccount (accountId: string) {
    return client.delete(`/accounts/${accountId}`);
  };

}

export default  new AccountService()