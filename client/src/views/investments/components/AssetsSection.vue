<template>
  <section>
    <h3 class="title">{{ section }}</h3>
    <v-divider class="my-3" />
    <v-row dense>
      <v-col v-for="asset in assets" :key="asset.name" cols="6" sm="4" md="3" lg="2">
        <v-card class="elevation-1">
          <v-card-title>
            <v-row no-gutters>
              <v-col cols="12">
                <span class="subtitle-1">{{ asset.name }}</span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="3" class="text-left">
                <span>{{ asset.quantity }}</span>
              </v-col>
              <v-col class="text-right">
                |
              </v-col>
              <v-col cols="8" class="text-right">
                <b>R$ {{ asset.totalAsset.toLocaleString('pt-BR') }}</b>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'InvestmentView'
})
export default class Investment extends Vue {
  @Prop({ required: true, type: String })
  section!: string

  @Prop({ required: true, type: Array })
  assets!: Object[]
}
</script>
