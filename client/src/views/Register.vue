<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-form ref="loginForm" v-model="valid" @submit.prevent="submitRegister">
          <v-row>
            <v-col class="text-center" cols="12">
              <v-avatar class="mb-4" color="primary" size="78">
                <v-icon large color="white">
                  mdi-account
                </v-icon>
              </v-avatar>
              <h2 v-text="'Cadastro'" />
            </v-col>
            <v-col class="pa-4" cols="12">
              <v-text-field
                v-model="name"
                :background-color="!theme.isDark ? 'grey lighten-3' : undefined"
                label="Nome de usuário"
                dense
                flat
                rounded
                solo
                :error-messages="error ? error.message : ''"
              />
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
                :error-messages="passwordError"
              />
              <v-text-field
                v-model="password2"
                :background-color="!theme.isDark ? 'grey lighten-3' : undefined"
                label="Repita a Senha"
                dense
                flat
                rounded
                solo
                type="password"
                :error-messages="password2Error"
              />
              <v-btn
                type="submit"
                color="primary"
                elevation="6"
                block
                large
                rounded
                :loading="loading"
                @submit.prevent="submitRegister"
                v-text="'Cadastrar-se'"
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
import auth from '../store/modules/auth'

@Component({
  inject: ['theme']
})
export default class Register extends Vue {
  name: string = ''
  email: string = ''
  password: string = ''
  password2: string = ''
  passwordError: string = ''
  password2Error: string = ''
  error: Error | null = null
  valid = true
  loading = false

  async submitRegister() {
    this.loading = true
    this.error = null
    try {
      if (!this.password) {
        this.passwordError = 'Senha não preenchida'
        return
      }
      if (!this.password2) {
        this.password2Error = 'Senha não preenchida'
        return
      }
      if (this.password != this.password2) {
        this.passwordError = 'Senhas não coincidem'
        return
      }
      const user = await auth.register({
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2
      })
      if (user != null) {
        this.$router.push('/dashboard')
      }
    } catch (error) {
      const message = error.response ? error.response.data : 'Erro ao cadastrar'
      this.error = message
    } finally {
      this.loading = false
    }
  }

  mounted() {
    if (auth.isAuthenticated) {
      this.$router.push('/dashboard')
    }
  }
}
</script>
