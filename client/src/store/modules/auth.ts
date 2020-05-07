import store from '..'
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, LoginData } from '@/service/AuthService'
import { User } from '@/models/user'

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
  async login(data: LoginData) {
    return await login(data)
  }

  @Mutation
  setUser(user: User) {
    this.user = user
  }
}

export default getModule(AuthModule)
