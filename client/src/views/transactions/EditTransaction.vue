<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
    <v-row v-if="!loading">
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
                  <v-text-field solo hide-details label="Nome da conta" v-model="transaction.description" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  Valor
                </v-col>
                <v-col cols="12">
                  <v-text-field solo hide-details label="Valor" prefix="R$" v-model="amount" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="mt-4">
            <v-btn
              block
              color="primary"
              :disabled="loadingEdition"
              :loading="loadingEdition"
              large
              @click="updateTransaction"
              >Atualizar Transação</v-btn
            >
          </div>
          <div class="mt-4">
            <v-btn
              block
              color="error"
              outlined
              :disabled="loadingDeletion"
              :loading="loadingDeletion"
              large
              @click="deleteTransaction"
              >Deletar Transação</v-btn
            >
          </div>
        </section>
      </v-col>
      <v-col cols="6"> </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '../../store/modules/auth'
import { User, ITransaction } from '../../models'
import { AccountSubtypes } from '../../models/enums'
import finances from '../../store/modules/finances'
import status from '../../store/modules/status'
import { getTransaction } from '../../service/api/transactions'

@Component({
  name: 'EditDebitAccountView'
})
export default class EditDebitAccount extends Vue {
  loading = false
  loadingEdition = false
  loadingDeletion = false
  accountTypes = [
    { text: 'Carteira', value: AccountSubtypes.CURRENCY },
    { text: 'Carteira Digital', value: AccountSubtypes.DIGITAL_CURRENCY },
    { text: 'Transação Corrente', value: AccountSubtypes.CURRENT },
    { text: 'Transação em Corretora', value: AccountSubtypes.BROKER }
  ]

  get user(): User | null {
    return auth.user
  }

  get amount(): string {
    const amount = this.transaction.amount || 0
    if (amount - Math.ceil(amount) !== 0) {
      return amount.toFixed(2).replace('.', ',')
    }
    return amount.toString()
  }
  set amount(str: string) {
    str.replace(/\D/g, '')
    if (str == '') str = '0'
    this.transaction.amount = parseFloat(str.replace(',', '.'))
  }

  get transaction(): ITransaction {
    const transactionId = this.$route.params.transactionId
    const tt = finances.transactions.find(a => a._id == transactionId)
    if (!tt && transactionId) {
      this.getTransaction(transactionId).then()
      this.$router.go(-1)
      return tt
    }
    return tt
  }
  set transaction(acc: ITransaction) {
    finances.replaceTransaction(acc)
  }

  async created() {
    if (!this.$route.params.transactionId) {
      this.$router.go(-1)
      return
    }
    if (!finances.transactions.length) {
      await this.getTransaction(this.$route.params.transactionId)
    }
  }

  beforeDestroy() {
    if (finances.transactions.length == 1) {
      finances.removeTransaction(this.transaction)
    }
  }

  async getTransaction(transactionId: string) {
    this.loading = true
    const { data: tt } = await getTransaction(transactionId)
    finances.setTransactions([tt])
    this.loading = false
  }

  async updateTransaction() {
    this.loadingEdition = true
    try {
      await finances.changeAccount(this.transaction)
      status.setStatus({
        type: 'success',
        message: 'Transação atualizada com sucesso'
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

  async deleteTransaction() {
    this.loadingDeletion = true
    try {
      await finances.deleteTransaction(this.transaction)
      status.setStatus({
        type: 'success',
        message: 'Transação deletada com sucesso'
      })
      this.$router.push('/contas')
    } catch (error) {
      status.setStatus({
        type: 'error',
        message: `Não foi possível deletar a transação: ${error.toString()}`
      })
      status.setError(error)
    } finally {
      this.loadingDeletion = true
    }
  }
}
</script>
