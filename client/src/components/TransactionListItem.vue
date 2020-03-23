<template>
  <v-list-item dense two-line>
    <v-list-item-avatar>
        <v-icon class="green">{{ transaction.accountIcon }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
        <v-list-item-title>
            {{ transaction.category }}
        </v-list-item-title>
        <v-list-item-subtitle>
            Empty
        </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action-text>
        <span class="blue--text">{{ transaction.amount }}</span>
    </v-list-item-action-text>
</v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ITransaction } from '../store/modules/Transactions'

@Component
export default class TransactionListItem extends Vue {
    @Prop({type: Object, required: true}) transaction!: ITransaction

    get typeColor(): string {
      switch (this.transaction.type) {
      case 'DEBIT': {
        return 'green'
      }
      case 'CREDIT': {
        return 'red'
      }
      case 'TRANSFERENCE': {
        return 'blue'
      }
      default: {
        return 'grey'
      }
      }
    }
}
</script>

<style>

</style>