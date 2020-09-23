<template>
	<v-container>
		<h1 class="display-1">{{ $route.name }}</h1>
		<section class="mt-3">
      <v-row no-gutters>
        <v-col cols="6">
          <div class="text-left">
            <h2 class="font-weight-light">Orçamentos</h2>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="text-right">
            <v-btn class="primary" text to="/projecoes/orcamentos/criar">Novo orçamento</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <!-- <app-transaction-item v-for="item in transactions" :key="item.id" :transaction="item" /> -->
          </v-card>
        </v-col>
      </v-row>
    </section>
    <v-dialog v-model="dialog" width="720">
      <v-card>
        <v-card-text class="text-center py-5">
          <p class="headline">Sua projeção financeira</p>
          <p>Escolha uma estratégia para começar</p>
          <v-row>
            <v-col v-for="opt in options" :key="opt.name">
              <v-card class="text-center pt-4 px-2 pb-2 white--text" :color="opt.color" @click="selectStrategy(opt.name)">
                <p class="font-weight-bold">{{ opt.name }}</p>
                <v-card outlined>
                  <v-card-text>
                    <p class="caption mb-4">Destinar da renda</p>
                    <p :class="`${opt.color}--text font-weight-bold mb-1`">{{ opt.expensesRatio*100 }}%</p>
                    <p class="caption mb-4">para gastar</p>
                    <p :class="`${opt.color}--text font-weight-bold mb-1`">{{ opt.investmentsRatio*100 }}%</p>
                    <p class="caption mb-0">para investir</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block outlined :color="opt.color">Escolher</v-btn>
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <div class="mt-5">
            <p>Não se preocupe, você irá poder customizar sua estratégia</p>
          </div>
          <v-divider></v-divider>
          <div class="mt-5">
            <v-btn text class="text-lowercase" @click="dialog = false">Escolher mais tarde</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	name: 'BudgetsView'
})
export default class Budgets extends Vue {
  dialog = true

  selectStrategy(strategy: string) {
    this.$router.push({
      path: '/projecoes/estrategia',
      query: {
        abordagem: strategy
      }
    })
  }

  options = [
    {
      color: 'red',
      name: 'Agressiva',
      expensesRatio: 0.25,
      investmentsRatio: 0.75
    },
    {
      color: 'blue',
      name: 'Balanceada',
      expensesRatio: 0.50,
      investmentsRatio: 0.50
    },
    {
      color: 'green',
      name: 'Conservadora',
      expensesRatio: 0.75,
      investmentsRatio: 0.25
    }
  ]
}
</script>
