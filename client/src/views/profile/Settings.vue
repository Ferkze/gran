<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
    <section>
      <h2 class="font-weight-light mt-3 mb-2">Preferências</h2>
      <v-card>
        <v-row align="center">
          <v-col cols="3" class="text-center">
            Tema
          </v-col>
          <v-col cols="9">
            <v-switch label="Escuro" v-model="dark" />
          </v-col>
        </v-row>
      </v-card>
    </section>
    <section>
      <h2 class="font-weight-light mt-3 mb-2">Minha conta</h2>
      <v-card>
        <v-row align="center">
          <v-col cols="3" class="text-center">
            <v-avatar color="primary" height="72px" width="72px">
              <span class="display-1 white--text font-weight-bold">{{ username[0] }}</span>
            </v-avatar>
          </v-col>
          <v-col cols="9" class="mt-2">
            <p>{{ `${user._id}` }}</p>
            <p>{{ `${username}` }}</p>
            <p>{{ `${user.email}` }}</p>
            <p>{{ `Criado em ${user.createdAt}` }}</p>
          </v-col>
        </v-row>
      </v-card>
      <div class="mt-3 text-sm-right">
        <v-btn color="error" outlined class="mr-3" v-text="'Delete Account'" />
        <v-btn color="error" v-text="'Logout'" @click="logout" />
      </div>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../../store/modules/auth'
import { User } from '../../models'

@Component({
  name: 'SettingsView'
})
export default class Settings extends Vue {
  get user(): User | null {
    return auth.user
  }

  get dark() {
    return this.$vuetify.theme.dark
  }
  set dark(value) {
    this.$vuetify.theme.dark = value
  }
  get username() {
    if (this.user.firstName) {
      return `${this.user.firstName} ${this.user.lastName}`
    } else if (this.user.username) return this.user.username
    else return ''
  }

  logout() {
    auth.logout()
    this.$router.push('/')
  }
}
</script>
