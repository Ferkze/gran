<template>
  <v-list-item dense three-line>
    <v-list-item-avatar>
      <v-icon class="green" color="white">mdi-bank</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ transaction.description }}
      </v-list-item-title>
      <v-list-item-subtitle class="text--primary">
        {{ transaction.category.name }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        {{ account }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action-text>
      <span :class="`${typeColor}--text`">{{ transaction.amount }}</span>
    </v-list-item-action-text>
    <v-list-item-action>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon color="primary" dark v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.action" @click="onMenuItemSelected(item.action)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ITransaction } from '../models'
import { TransactionType } from '../models/enums'
import finances from '../store/modules/finances'

@Component
export default class TransactionListItem extends Vue {
  @Prop({ type: Object, required: true }) transaction!: ITransaction

  menuItems = [
    { text: 'Editar', action: 'edit' },
    { text: 'Deletar', action: 'delete' }
  ]

  get account() {
    switch (this.transaction.type) {
      case TransactionType.DEBIT: {
        return this.transaction.debitAccount.name
      }
      case TransactionType.CREDIT: {
        return this.transaction.creditAccount.name
      }
      case TransactionType.TRANSFERENCE: {
        return `${this.transaction.creditAccount.name} para ${this.transaction.debitAccount.name}`
      }
      default: {
        return ''
      }
    }
  }
  get typeColor(): string {
    switch (this.transaction.type) {
      case TransactionType.DEBIT: {
        return 'green'
      }
      case TransactionType.CREDIT: {
        return 'red'
      }
      case TransactionType.TRANSFERENCE: {
        return 'blue'
      }
      default: {
        return 'grey'
      }
    }
  }

  onMenuItemSelected(action: string) {
    switch (action) {
      case 'edit':
        this.$router.push(`/transacao/${this.transaction._id}/edicao`)
        break
      case 'delete':
        finances.deleteTransaction(this.transaction)
        break
      default:
        break
    }
  }
}
</script>
