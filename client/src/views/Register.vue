<template>
	<v-container class="fill-height">
		<v-row justify="center">
			<v-col cols="12" sm="8">
				<v-card>
					<v-card-title>
						<h2 class="font-weight-medium title">Cadastrar</h2>
					</v-card-title>
					<v-card-text>
						<v-form ref="loginForm" v-model="valid" @submit.prevent="submitRegister">
							<v-row justify="center">
								<v-col cols="8" xs="12" class="mb-10 text-center">
									<v-avatar class="mb-4" color="primary" size="78">
										<v-icon large color="white">
											mdi-account
										</v-icon>
									</v-avatar>
									<base-form-field
										v-model="name"
										label="Nome de usuário"
										form-field="text-field"
										form-label="NOME"
										:error-messages="error ? error.message : ''"
										:hide-details="error ? false : true"
									/>
									<base-form-field
										v-model="email"
										label="Email"
										form-field="text-field"
										form-label="EMAIL"
										:error-messages="error ? error.message : ''"
										:hide-details="error ? false : true"
									/>
									<base-form-field
										v-model="password"
										label="Senha"
										form-field="text-field"
										form-label="SENHA"
										type="password"
										:error-messages="passwordError"
										:hide-details="passwordError ? false : true"
									/>
									<base-form-field
										v-model="password2"
										label="Repita a Senha"
										form-field="text-field"
										form-label="CONFIRMAÇÃO DE SENHA"
										type="password"
										:error-messages="password2Error"
										:hide-details="password2Error ? false : true"
									/>
									<base-button
										type="submit"
										color="primary"
                    class="mt-5"
										block
										large
										:loading="loading"
										:disabled="loading"
										@submit.prevent="submitRegister"
										v-text="'Cadastrar-se'"
									/>
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
import auth from '../store/modules/auth'

import BaseButton from "@/components/base/Button.vue";
import BaseFormField from "@/components/base/FormField.vue";

@Component({
	inject: ['theme'],
	components: {
    BaseButton,
		BaseFormField
	}
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
			const message = error.message ? error.message : 'Erro ao cadastrar'
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
