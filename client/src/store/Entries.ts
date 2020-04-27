import { Module, VuexModule } from 'vuex-module-decorators'

@Module({ name: 'entries', namespaced: true })
export default class EntriesModule extends VuexModule {}
