<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col class="text-center" cols="12">
                <v-avatar class="mb-4" color="primary" size="78">
                  <v-icon large>mdi-account</v-icon>
                </v-avatar>
                  <h2>Entrar</h2>
              </v-col>
              <v-col class="pa-8" cols="12">
                  <v-text-field label="Email" outlined rounded />
                  <v-text-field label="Senha" outlined rounded type="password" />
                  <v-btn color="primary" elevation="6" block x-large rounded>Entrar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthModule from '@/store/'

@Component
export default class Login extends Vue {
  email: string = ''
  password: string = ''

  login() {

  }
}
</script>