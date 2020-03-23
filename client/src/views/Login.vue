<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <v-card>
          <v-card-text>
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
                    <v-icon large>
                      mdi-account
                    </v-icon>
                  </v-avatar>
                  <h2>Entrar</h2>
                </v-col>
                <v-col
                  class="pa-8"
                  cols="12"
                >
                  <v-text-field
                    v-model="email"
                    label="Email"
                    outlined
                    rounded
                    :error-messages="error ? error.message : ''"
                  />
                  <v-text-field
                    v-model="password"
                    label="Senha"
                    outlined
                    rounded
                    type="password"
                  />
                  <v-btn
                    type="submit"
                    color="primary"
                    elevation="6"
                    block
                    x-large
                    rounded
                    :loading="loading"
                    @submit.prevent="submitLogin"
                  >
                    Entrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthModule from '../store/modules/AuthModule'
import { getModule } from 'vuex-module-decorators'
import { login } from '@/service/auth.service'

@Component
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