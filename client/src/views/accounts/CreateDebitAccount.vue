<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
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
                    :items="accountInstitutions"
                    solo
                    hide-details
                    label="Banco ou corretora"
                    v-model="account.institution"
                  />
                </v-col>
              </v-row>
              <v-row v-if="account.institution == 'other'">
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
          <v-btn block color="primary" :disabled="loading" :loading="loading" large @click="createAccount"
            >Criar conta</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '@/store/modules/auth'
import { User, IAccount } from '../../models'
import { AccountSubtypes, AccountTypes } from '../../models/enums'
import finances from '@/store/modules/finances'
import status from '@/store/modules/status'

@Component({
  name: 'SettingsView'
})
export default class Settings extends Vue {
  account: IAccount = {
    name: '',
    main: false,
    institution: '',
    unregisteredInstitution: '',
    type: AccountTypes.DEBIT,
    subtype: AccountSubtypes.CURRENT,
    startingBalance: 0.0,
    owner: auth.user?._id
  }
  loading = false
  accountTypes = [
    { text: 'Carteira', value: AccountSubtypes.CURRENCY },
    { text: 'Carteira Digital', value: AccountSubtypes.DIGITAL_CURRENCY },
    { text: 'Conta Corrente', value: AccountSubtypes.CURRENT },
    { text: 'Conta em Corretora', value: AccountSubtypes.BROKER }
  ]

  get accountInstitutions() {
    if (this.account.subtype == AccountSubtypes.CURRENT)
      return [
        { text: 'Nubank', value: 'nubank' },
        { text: 'Banco Inter', value: 'banco-inter' },
        { text: 'Next', value: 'next' },
        { text: 'Bradesco', value: 'bradesco' },
        { text: 'Itaú', value: 'itau' },
        { text: 'Santander', value: 'santander' },
        { text: 'C6 Bank', value: 'c6' },
        { text: 'Outro', value: 'other' }
      ]
    else if (this.account.subtype == AccountSubtypes.BROKER)
      return [
        { text: 'BTG Pactual Digital', value: 'btg-digital' },
        { text: 'Rico', value: 'banco-inter' },
        { text: 'Clear', value: 'clear' },
        { text: 'Modal Mais', value: 'modal-mais' },
        { text: 'XP', value: 'xp' },
        { text: 'Santander Corretora', value: 'bradesco-corretora' },
        { text: 'Itaú Corretora', value: 'itau-corretora' },
        { text: 'Bradesco Corretora', value: 'santander-corretora' },
        { text: 'Outro', value: 'other' }
      ]
    else if (this.account.subtype == AccountSubtypes.DIGITAL_CURRENCY)
      return [
        { text: 'PicPay', value: 'picpay' },
        { text: 'Meliuz', value: 'meliuz' },
        { text: 'Ame Digital', value: 'ame' },
        { text: 'Rappi Creditos', value: 'rappi' },
        { text: 'Outro', value: 'other' }
      ]
    else return []
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
