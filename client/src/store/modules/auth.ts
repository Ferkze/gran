import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { loginToken, register, logout, LoginData, RegisterData } from '@/service/api/auth'
import { User } from '@/models'

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
		return await loginToken(data)
	}

	@Action({ commit: 'setUser', rawError: true })
	async register(data: RegisterData): Promise<User> {
		const user = await register(data)
		await loginToken({ email: data.email, password: data.password })
		return user
	}

	@Action({ commit: 'setUser', rawError: true })
	logout(): null {
		logout()
		return null
	}

	@Mutation
	setUser(user: User | null) {
		this.user = user
	}
}

export default getModule(AuthModule)
