import store from '..'
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import { AppStatus } from '@/models'

@Module({
  store,
  dynamic: true,
  namespaced: true,
  name: 'snackbar'
})
class StatusModule extends VuexModule {
  code: string = ''
  message: string = ''
  type: string = ''
  error: Error | null = null

  @Mutation
  setStatus(status: AppStatus) {
    this.message = status.message || ''
    this.type = status.type || ''
    this.code = status.code || ''
  }

  @Mutation
  setError(error: Error) {
    this.error = error
  }
}

export default getModule(StatusModule)
