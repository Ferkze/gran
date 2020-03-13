import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { login } from '@/service/api/auth'
import { User } from '@/models/User'

@Module({ namespaced: true, name: 'auth' })
export default class AuthModule extends VuexModule {
    user?: User

    @Action({ commit: 'setUser', rawError: true })
    async login(email: string, password: string) {
      try {
        const user = await login({ email, password })
        return user
      } catch (error) {
        throw error
      }
    }

    @Mutation
    setUser(user: User) {
      this.user = user
    }
}