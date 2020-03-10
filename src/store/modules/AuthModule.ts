import { Module, VuexModule, Action } from 'vuex-module-decorators'

export type User = {
    email ?: string
    firstName ?: string
    lastName ?: string
    accounts?: Account[]
    fullName(): string
  
    createdAt?: string
    updatedAt?: string
}
  
@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
    user?: User

    @Action({ commit: 'setUser' })
    login(email: string, password: string) {

    }
}