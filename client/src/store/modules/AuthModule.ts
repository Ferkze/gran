import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { login } from '@/service/AuthService'
import { User } from '@/models/User'

@Module({ namespaced: true, name: 'auth' })
export default class AuthModule extends VuexModule {
  user: User | null = null

  get isAuthenticated(): boolean {
    if (this.user === null) return false
    if (this.user.email === '') return false
    return true
  }

  @Action({ commit: 'setUser', rawError: true })
  async login(email: string, password: string) {
    const user = await login({ email, password })
    return user
  }

  @Mutation
  setUser(user: User) {
    console.log(user)
    this.user = user
  }
}
