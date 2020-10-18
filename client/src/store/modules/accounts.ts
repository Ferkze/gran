import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import AccountService from '@/service/api/AccountService'
import auth from './auth'

import { Account } from '@/models'

@Module({
	store,
	dynamic: true,
	namespaced: true,
	name: 'accounts'
})
class AccountModule extends VuexModule {
	accounts: Account[] = []

	get accountIds() {
		return this.accounts.map(a => a.id)
	}

	@Action({ commit: 'setAccounts', rawError: true })
	async fetchAccounts(): Promise<Account[]> {
		if (!auth.user || !auth.user.id) {
			return []
		}
		const accounts = await AccountService.getAccounts()
		accounts.forEach(acc => this.getAccountBalance(acc.id))
		return accounts
	}

	@Action({ commit: 'addAccount', rawError: true })
	async createAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		account.owner = auth.user.id
		const savedAccount = await AccountService.createAccount(auth.user.id, account)
		savedAccount.balance = savedAccount.startingBalance
		return savedAccount
	}

	@Action({ commit: 'replaceAccount', rawError: true })
	async changeAccount(account: Account): Promise<Account | null> {
		if (!auth.user || !auth.user.id) {
			return null
		}
		const updatedAccount = await AccountService.updateAccount(auth.user.id, account)
		this.getAccountBalance(updatedAccount.id)
		return updatedAccount
	}

	@Action({ commit: 'removeAccount', rawError: true })
	async deleteAccount(account: Account): Promise<Account['id'] | null> {
		if (!auth.user || !auth.user.id || !account.id) {
			return null
		}
		await AccountService.deleteAccount(account.id)
		return account.id
	}

	@Action({ commit: 'mutateAccountBalance', rawError: true })
	async getAccountBalance(accountId: Account['id']): Promise<{ accountId: Account['id'], balance: number }> {
		if (!auth.user || !auth.user.id) {
			throw new Error('Usuário não autenticado')
		}
		const balance = await AccountService.getAccountBalance(accountId)
		return {
			accountId,
			balance
		}
	}

	@Mutation
	setAccounts(accounts: Account[]) {
		this.accounts = accounts
	}

	@Mutation
	addAccount(account: Account) {
		this.accounts.push(account)
	}

	@Mutation
	replaceAccount(account: Account) {
		const index = this.accounts.findIndex(a => a.id == account.id)
		this.accounts.splice(index, 1, account)
	}

	@Mutation
	removeAccount(accountId: Account['id']) {
		const index = this.accounts.findIndex(a => a.id == accountId)
		this.accounts.splice(index, 1)
	}

	@Mutation
	mutateAccountBalance(accountBalance: { accountId: Account['id'], balance: number }) {
		const index = this.accounts.findIndex(a => a.id == accountBalance.accountId)
		if (index != -1) {
			this.accounts.splice(index, 1, { ...this.accounts[index], balance: accountBalance.balance })
		}

	}
}

export default getModule(AccountModule)
