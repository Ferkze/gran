<template>
  <v-container class="">
    <h1 class="display-1">{{ $route.name }}</h1>
    <v-divider class="my-3" />
    <section>
      <v-row>
        <v-col cols="12"> Total investido: R$ {{ totalInvested | formatCurrency }} </v-col>
      </v-row>
    </section>
    <investment-asset-section class="mt-3" section="Ações" :assets="sharesInvestments" />
    <investment-asset-section class="mt-3" section="Fundos Imobiliários" :assets="fundsInvestments" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'InvestmentView',
  components: {
    InvestmentAssetSection: () => import('./components/AssetsSection.vue')
  }
})
export default class Investment extends Vue {
  investmentTypes = [
    { name: 'Renda Variável', total: 25709.9, color: 'red', totalAssets: 16, monthResult: 394.86 },
    { name: 'Renda Fixa', total: 4980.87, color: 'blue', totalAssets: 2, monthResult: 10.37 }
  ]
  investments = [
    { type: 'Acoes', name: 'PETR4', title: 'Ações Petrobrás', totalAsset: 2570.99, quantity: 120 },
    { type: 'Acoes', name: 'VVAR3', title: 'Ações Via Varejo', totalAsset: 2570.99, quantity: 120 },
    { type: 'Acoes', name: 'ITUB3', title: 'Ações Itaú Unibanco', totalAsset: 2570.99, quantity: 120 },
    { type: 'Acoes', name: 'TOTS3', title: 'Ações TOTVS', totalAsset: 2570.99, quantity: 120 },
    { type: 'Acoes', name: 'VIVA3', title: 'Ações Vivara', totalAsset: 2570.99, quantity: 120 },
    { type: 'Acoes', name: 'TAEE11', title: 'Ações Taesa', totalAsset: 2570.99, quantity: 120 },
    { type: 'Fundos', name: 'BCFF11', title: 'FII Fundo de Fundos', totalAsset: 2570.99, quantity: 120 },
    {
      type: 'Fundos',
      name: 'KNRI11',
      title: 'FII Kinea Renda Imobiliária',
      totalAsset: 2570.99,
      quantity: 120
    },
    { type: 'Fundos', name: 'MXRF11', title: 'FII Maxi Renda', totalAsset: 2570.99, quantity: 120 }
  ]

  get fundsInvestments() {
    return this.investments.filter(i => i.type == 'Fundos')
  }

  get sharesInvestments() {
    return this.investments.filter(i => i.type == 'Acoes')
  }

  get totalInvested() {
    return this.investments.reduce((a, c) => a + c.totalAsset, 0)
  }
}
</script>
