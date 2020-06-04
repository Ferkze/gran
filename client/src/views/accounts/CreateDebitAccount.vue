<template>
	<v-container class="">
		<h1 class="display-1">{{ $route.name }}</h1>
		<v-row>
			<v-col cols="6">
				<section>
					<v-card>
						<v-card-title class="">
							<h2 class="title font-weight-medium mt-3 mb-2">Dados principais</h2>
						</v-card-title>
						<v-card-text>
							<v-row no-gutters>
								<v-col cols="12">
									<v-subheader>Nome</v-subheader>
								</v-col>
								<v-col cols="12">
									<base-text-field
										background-color="grey lighten-3"
										flat
										solo
										hide-details
										label="Nome da conta"
										v-model="account.name"
									/>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col cols="12">
									<v-subheader>Tipo</v-subheader>
								</v-col>
								<v-col cols="12">
									<base-select :items="accountTypes" hide-details label="Tipo de conta" v-model="account.subtype" />
								</v-col>
							</v-row>
							<v-row v-if="account.subtype != 'currency' && account.subtype != ''" no-gutters>
								<v-col cols="12">
									<v-subheader>Instituição</v-subheader>
								</v-col>
								<v-col cols="12">
									<base-select
										v-model="account.institution"
										:items="accountInstitutions"
										item-text="name"
										return-object
										hide-details
										label="Banco ou corretora"
									/>
								</v-col>
							</v-row>
							<v-row v-if="account.institution.name.startsWith('Outro')" no-gutters>
								<v-col cols="12">
									<v-subheader>Outra Instituição</v-subheader>
								</v-col>
								<v-col cols="12">
									<base-text-field
										background-color="grey lighten-3"
										flat
										solo
										hide-details
										label="Banco ou corretora"
										v-model="account.unregisteredInstitution"
									/>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</section>
			</v-col>
			<v-col cols="6">
				<section>
					<v-card>
						<v-card-title class="">
							<h2 class="title font-weight-medium mt-3 mb-2">Detalhes adicionais</h2>
						</v-card-title>
						<v-card-text>
							<v-row no-gutters>
								<v-col cols="12">
									<v-subheader>Saldo inicial</v-subheader>
								</v-col>
								<v-col cols="12">
									<base-text-field
										background-color="grey lighten-3"
										flat
										solo
										hide-details
										prefix="R$ "
										label="0,00"
										v-model="balance"
									/>
								</v-col>
							</v-row>
							<v-row no-gutters>
								<v-col cols="12">
									<v-subheader>Principal</v-subheader>
								</v-col>
								<v-col cols="12">
									<v-checkbox label="É sua conta principal?" v-model="account.main" />
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</section>

				<div class="mt-4">
					<v-btn block color="primary" :disabled="loading" :loading="loading" large @click="createAccount">
						Criar conta
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../../store/modules/auth'
import { User, Account } from '../../models'
import { AccountSubtypes, AccountTypes } from '../../models/enums'
import finances from '../../store/modules/finances'
import status from '../../store/modules/status'

import BaseTextField from '@/components/base/TextField.vue'
import BaseSelect from '@/components/base/Select.vue'

@Component({
	components: {
		BaseTextField,
		BaseSelect
	},
	name: 'SettingsView'
})
export default class Settings extends Vue {
	account: Account = {
		name: '',
		main: false,
		institution: '',
		unregisteredInstitution: '',
		type: AccountTypes.DEBIT,
		subtype: AccountSubtypes.CURRENT,
		startingBalance: 0.0
	}
	loading = false
	accountTypes = [
		{ text: 'Carteira', value: AccountSubtypes.CURRENCY },
		{ text: 'Carteira Digital', value: AccountSubtypes.DIGITAL_CURRENCY },
		{ text: 'Conta Corrente', value: AccountSubtypes.CURRENT },
		{ text: 'Conta em Corretora', value: AccountSubtypes.BROKER }
	]

	get accountInstitutions() {
		switch (this.account.subtype) {
			case AccountSubtypes.CURRENT:
				return finances.bankInstitutions
			case AccountSubtypes.BROKER:
				return finances.brokerInstitutions
			case AccountSubtypes.DIGITAL_CURRENCY:
				return finances.paymentInstitutions
			default:
				return []
		}
	}

	get user(): User | null {
		return auth.user
	}

	get balance(): string {
		const balance = this.account.startingBalance || 0
		if (balance - Math.ceil(balance) !== 0) {
			return balance.toFixed(2).replace('.', ',')
		}
		return balance.toString()
	}
	set balance(str: string) {
		str.replace(/\D/g, '')
		if (str == '') str = '0'
		this.account.startingBalance = parseFloat(str.replace(',', '.'))
	}

	async createAccount() {
		this.loading = true
		try {
			await finances.newAccount(this.account)
			status.setStatus({
				type: 'success',
				message: 'Conta criada com sucesso'
			})
			this.$router.push('/dashboard/contas')
		} catch (error) {
			status.setStatus({
				type: 'error',
				message: `Não foi possível cria a conta: ${error.toString()}`
			})
			status.setError(error)
		} finally {
			this.loading = true
		}
	}
}
</script>
