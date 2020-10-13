<template>
  <v-container class="fill-height">
    <v-row class="fill-height" justify="center" no-gutters>
      <v-col cols="8">
        <v-card>
          <v-form ref="loginForm" v-model="valid" @submit.prevent="submitLogin">
            <v-card-title>
              <h2 class="font-weight-medium title">Entrar</h2>
            </v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col cols="8" xs="12" class="mb-10 text-center">
                  <v-avatar class="mb-4" color="primary" size="78">
                    <v-icon large color="white">
                      mdi-account
                    </v-icon>
                  </v-avatar>
                  <base-form-field
                    v-model="email"
                    autofocus
                    placeholder="Email"
                    form-label="EMAIL"
                    form-field="text-field"
                    hide-details
                    :error-messages="error ? error.message : ''"
                  />
                  <base-form-field
                    v-model="password"
                    placeholder="Senha"
                    form-field="text-field"
                    form-label="SENHA"
                    hide-details
                    type="password"
                  />
                  <base-button
                    type="submit"
                    block
                    class="mt-5"
                    large
                    :loading="loading"
										:disabled="loading"
                    v-text="'Entrar'"
                    @submit.prevent="submitLogin"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import auth from "../store/modules/auth";

import BaseButton from "@/components/base/Button.vue";
import BaseFormField from "@/components/base/FormField.vue";

@Component({
  components: {
    BaseButton,
    BaseFormField,
  },
  inject: ["theme"],
})
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  error: Error | null = null;
  valid = true;
  loading = false;

  async submitLogin() {
    this.loading = true;
    this.error = null;
    try {
      const user = await auth.login({
        email: this.email,
        password: this.password,
      });
      if (user != null) {
        this.$router.push("/dashboard");
      }
    } catch (error) {
      const message = error.response ? error.response.data : "Erro ao entrar";
      this.error = message;
    } finally {
      this.loading = false;
    }
  }

  mounted() {
    if (auth.isAuthenticated) {
      this.$router.push("/dashboard");
    }
  }
}
</script>
