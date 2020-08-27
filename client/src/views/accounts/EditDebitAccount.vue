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
							<v-row>
								<v-col cols="12">
									Código
								</v-col>
								<v-col cols="12">
									<v-text-field solo hide-details label="Código da conta" disabled :value="account._id" />
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									Nome
								</v-col>
								<v-col cols="12">
									<v-text-field solo hide-details label="Nome da conta" v-model="account.name" />
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									Tipo
								</v-col>
								<v-col cols="12">
									<v-select :items="accountTypes" solo hide-details label="Tipo de conta" v-model="account.subtype" />
								</v-col>
							</v-row>
							<v-row v-if="account.subtype != 'currency' && account.subtype != ''">
								<v-col cols="12">
									Instituição
								</v-col>
								<v-col cols="12">
									<v-select
										v-model="institution"
										:items="accountInstitutions"
										solo
										hide-details
										item-text="name"
										return-object
										label="Banco ou corretora"
									/>
								</v-col>
							</v-row>
							<v-row v-if="account.institution && account.institution.name == 'Outro'">
								<v-col cols="12">
									Outra Instituição
								</v-col>
								<v-col cols="12">
									<v-text-field
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
							<v-row>
								<v-col cols="12">
									Saldo inicial
								</v-col>
								<v-col cols="12">
									<v-text-field solo hide-details prefix="R$ " label="0,00" v-model="balance" />
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									Principal
								</v-col>
								<v-col cols="12">
									<v-checkbox label="É sua conta principal?" v-model="account.main" />
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</section>

				<div class="mt-4">
					<v-btn
						block
						color="primary"
						:disabled="loadingEdition"
						:loading="loadingEdition"
						large
						@click="updateAccount"
					>
						Atualizar conta
					</v-btn>
				</div>
				<div class="mt-4">
					<v-btn
						block
						color="error"
						outlined
						:disabled="loadingDeletion"
						:loading="loadingDeletion"
						large
						@click="deleteAccount"
					>
						Deletar conta
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../../store/modules/auth'
import { User, Account, Institution } from '../../models'
import { AccountSubtypes } from '../../models/enums'
import finances from '../../store/modules/finances'
import status from '../../store/modules/status'

@Component({
	name: 'EditDebitAccountView'
})
export default class EditDebitAccount extends Vue {
	loadingEdition = false
	loadingDeletion = false
	accountTypes = [
		{ text: 'Carteira', value: AccountSubtypes.CURRENCY },
		{ text: 'Carteira Digital', value: AccountSubtypes.DIGITAL_CURRENCY },
		{ text: 'Conta Corrente', value: AccountSubtypes.CURRENT },
		{ text: 'Conta em Corretora', value: AccountSubtypes.BROKER }
	]

	get accountInstitutions() {
		if (!this.account) {
			return ''
		}
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
		if (!this.account) {
			return ''
		}
		const balance = this.account.startingBalance || 0
		if (balance - Math.ceil(balance) !== 0) {
			return balance.toFixed(2).replace('.', ',')
		}
		return balance.toString()
	}
	set balance(str: string) {
		if (!this.account) {
			return
		}
		str.replace(/\D/g, '')
		if (str == '') str = '0'
		this.account.startingBalance = parseFloat(str.replace(',', '.'))
	}

	get account(): Account | undefined {
		const acc = finances.accounts.find(a => a._id == this.$route.params.accountId)
		if (!acc) {
			this.$router.go(-1)
			return undefined
		}
		return acc
	}
	set account(acc: Account | undefined) {
		if (!acc) return
		finances.replaceAccount(acc)
	}

	get institution(): Institution | null {
		if (!this.account) {
			return null
		}
		if (!this.account.institution) {
			return null
		}
		const inst = this.account.institution
		if (typeof inst == 'string') {
			const institution = finances.institutions.find(i => i._id == inst)
			return institution || null
		}
		return inst
	}

	set institution(institution: Institution | null) {
		if (!this.account) {
			return
		}
		if (!this.institution) {
			this.account.institution = undefined
			return
		}
		if (institution) {
			this.account.institution = institution._id
		}
	}

	created() {
		if (!this.$route.params.accountId) {
			this.$router.go(-1)
			return
		}
	}

	async updateAccount() {
		if (!this.account) {
			return
		}
		this.loadingEdition = true
		try {
			await finances.changeAccount(this.account)
			status.setStatus({
				type: 'success',
				message: 'Conta atualizada com sucesso'
			})
			this.$router.push('/contas')
		} catch (error) {
			status.setStatus({
				type: 'error',
				message: `Não foi possível atualizar a conta: ${error.toString()}`
			})
			status.setError(error)
		} finally {
			this.loadingEdition = true
		}
	}

	async deleteAccount() {
		if (!this.account) {
			return
		}
		this.loadingDeletion = true
		try {
			await finances.deleteAccount(this.account)
			status.setStatus({
				type: 'success',
				message: 'Conta deletada com sucesso'
			})
			this.$router.push('/contas')
		} catch (error) {
			status.setStatus({
				type: 'error',
				message: `Não foi possível deletar a conta: ${error.toString()}`
			})
			status.setError(error)
		} finally {
			this.loadingDeletion = true
		}
	}
}
</script>
