<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-form
          v-model="valid"
          ref="loginForm"
          @submit.prevent="submitLogin"
        >
          <v-row>
            <v-col
              class="text-center"
              cols="12"
            >
              <v-avatar
                class="mb-4"
                color="primary"
                size="78"
              >
                <v-icon large color="white">
                  mdi-account
                </v-icon>
              </v-avatar>
              <h2 v-text="'Entrar'"/>
            </v-col>
            <v-col
              class="pa-4"
              cols="12"
            >
              <v-text-field
                v-model="email"
                :background-color="!theme.isDark ? 'grey lighten-3' : undefined"
                label="Email"
                dense
                flat
                rounded
                solo
                :error-messages="error ? error.message : ''"
              />
              <v-text-field
                v-model="password"
                :background-color="!theme.isDark ? 'grey lighten-3' : undefined"
                label="Senha"
                dense
                flat
                rounded
                solo
                type="password"
              />
              <v-btn
                type="submit"
                color="primary"
                elevation="6"
                block
                large
                rounded
                :loading="loading"
                @submit.prevent="submitLogin"
                v-text="'Entrar'"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthModule from '../store/modules/AuthModule'
import { getModule } from 'vuex-module-decorators'
import { login } from '../service/auth.service'

@Component({
  inject: ['theme']
})
export default class Login extends Vue {
  authMod: AuthModule = getModule(AuthModule, this.$store)
  email: string = ''
  password: string = ''
  error: Error | null = null
  valid = true
  loading = false

  async submitLogin($event: Event) {
    this.loading = true
    this.error = null
    try {
      const user = await login({
        email: this.email,
        password: this.password
      })
      if (user != null) {
        this.authMod.setUser(user)
        this.$router.push('dashboard')
      }
    } catch (error) {
      this.error = error.response.data
    } finally {
      this.loading = false
    }
  }
}
</script>