import store from '..'
import status from './status'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { User } from '@/models'
import { LoginData, RegisterData } from '@/models/auth'
import AuthService from '@/service/api/AuthService'

@Module({
	store,
	dynamic: true,
	namespaced: true,
	name: 'auth'
})
class AuthModule extends VuexModule {
	user: User | null = null

	get isAuthenticated(): boolean {
		if (this.user === null) return false
		if (this.user.email === '') return false
		return true
	}

	@Action({ commit: 'setUser', rawError: true })
	async login(data: LoginData): Promise<User> {
		return await AuthService.login(data)
	}
	
	@Action({ commit: 'setUser', rawError: true })
	async silentLogin(): Promise<User | null> {
		try {
			return await AuthService.silentLogin()
		} catch (error) {
			status.setStatus({
				type: 'error',
				message: 'Sessão expirada'
			})
			this.logout()
			return null
		}
	}

	@Action({ commit: 'setUser', rawError: true })
	async register(data: RegisterData): Promise<User> {
		return await AuthService.register(data)
	}

	@Action({ commit: 'setUser', rawError: true })
	logout(): null {
		AuthService.logout()
		return null
	}

	@Mutation
	setUser(user: User | null) {
		this.user = user
	}
}

export default getModule(AuthModule)
