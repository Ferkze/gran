<template>
  <v-container>
    <h1 class="heading font-weight-bold">
      Transações
    </h1>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-text>
            <v-list>
              <v-subheader>Maio, 2020</v-subheader>
              <v-list-item v-for="item in transactions" :key="item.category" dense two-line>
                <v-list-item-avatar>
                  <v-icon class="green">
                    {{ item.accountIcon }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.category }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Empty
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text>
                  <span class="blue--text">{{ item.amount }}</span>
                </v-list-item-action-text>
              </v-list-item>
              <!-- <v-list-item dense two-line>
                                <v-list-item-avatar>
                                    <v-icon class="orange">mdi-bank</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Salário</v-list-item-title>
                                    <v-list-item-subtitle>Débito na conta Banco Inter</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action-text>
                                    <span class="green--text">R$ 531,17</span>
                                </v-list-item-action-text>
                            </v-list-item>
                            <v-list-item dense two-line>
                                <v-list-item-avatar>
                                    <v-icon class="purple">mdi-bank</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Fatura do Cartão de Crédito</v-list-item-title>
                                    <v-list-item-subtitle>Crédito na conta Nubank</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action-text>
                                    <span class="red--text">- R$ 231,10</span>
                                </v-list-item-action-text>
                            </v-list-item> -->
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>
            Filtros
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <p>Tipo de transação</p>
              </v-col>
              <v-col cols="12">
                <v-btn-group>
                  <v-btn color="green">
                    Receita
                  </v-btn>
                  <v-btn color="red">
                    Despesa
                  </v-btn>
                  <v-btn color="info">
                    Transf
                  </v-btn>
                </v-btn-group>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <p class="mb-0">
                  Início
                </p>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Data de inínio" />
              </v-col>
              <v-col cols="12">
                <p class="mb-0">
                  Até
                </p>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Data de limite" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Transactions extends Vue {
  transactions = [
    {
      amount: -327.92,
      category: 'Fatura do Cartão de Crédito',
      type: 'CRED',
      account: 'Nubank',
      accountIcon: 'mdi-bank',
      accountColor: 'purple'
    },
    {
      amount: 327.92,
      category: 'Salário',
      type: 'DEB',
      account: 'Banco Inter',
      accountIcon: 'mdi-bank',
      accountColor: 'orange'
    },
    {
      amount: 327.92,
      category: 'Freelance',
      type: 'DEB',
      account: 'Nubank',
      accountIcon: 'mdi-bank',
      accountColor: 'purple'
    },
    {
      amount: 50.0,
      category: 'Transferência',
      type: 'TRANSF',
      accounts: {
        from: { account: 'Banco Inter', accountIcon: 'mdi-bank', accountColor: 'orange' },
        to: { account: 'Carteira', accountIcon: 'mdi-wallet', accountColor: 'green' }
      }
    }
  ]
}
</script>
