<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
    <h2 class="font-weight-light">Minhas contas</h2>
    <v-divider />
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="acc in debitAccounts" :key="acc._id">
        <v-card>
          <v-card-title>
            <v-row no-gutters>
              <v-col cols="6">
                <span>{{ acc.name }}</span>
              </v-col>
              <v-col cols="6" class="text-right">
                <span>
                  <v-btn icon color="primary">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <p>
              Saldo <span class="font-weight-black float-right">{{ acc.startingBalance }}</span>
            </p>
            <p>Criado em {{ acc.createdAt }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-hover v-slot:default="{ hover }">
          <v-btn height="160" block color="primary" :outlined="!hover" @click="createAccount">
            <v-container>
              <v-row>
                <v-col cols="12"><v-icon large left>mdi-bank-plus</v-icon></v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  Adicionar conta
                </v-col>
              </v-row>
            </v-container>
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
    <h2 class="font-weight-light">Meus cartões de crédito</h2>
    <v-divider />
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="acc in creditAccounts" :key="acc._id">
        <v-card>
          <v-card-title>
            <v-row no-gutters>
              <v-col cols="6">
                <span>{{ acc.name }}</span>
              </v-col>
              <v-col cols="6" class="text-right">
                <span>
                  <v-btn icon color="primary">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <p>
              Saldo <span class="font-weight-black float-right">{{ acc.startingBalance }}</span>
            </p>
            <p>Criado em {{ acc.createdAt }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-hover v-slot:default="{ hover }">
          <v-btn height="160" block color="primary" :outlined="!hover" @click="createCreditCard">
            <v-container>
              <v-row>
                <v-col cols="12"><v-icon large left>mdi-credit-card-plus</v-icon></v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  Adicionar cartão
                </v-col>
              </v-row>
            </v-container>
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import finances from '../../store/modules/finances'
import { AccountTypes } from '../../models/enums'

@Component({
  name: 'AccountsView'
})
export default class Accounts extends Vue {
  mounted() {
    finances.fetchAccounts()
  }

  get debitAccounts() {
    return finances.accounts.filter(a => a.type == AccountTypes.DEBIT)
  }
  get creditAccounts() {
    return finances.accounts.filter(a => a.type == AccountTypes.CREDIT)
  }

  createAccount() {
    this.$router.push('/contas/criar')
  }
  createCreditCard() {
    alert('ok')
  }
}
</script>
