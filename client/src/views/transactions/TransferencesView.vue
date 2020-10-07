<template>
	
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card width="100%" flat>
          <v-row no-gutters>
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="primary">
                    <v-icon large color="white">mdi-plus</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Registrar</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
						<v-spacer></v-spacer>
            
            <v-col cols="3">
              <v-list-item>
                <v-list-item-icon>
                  <v-avatar color="info">
                    <v-icon right large color="white">mdi-bank-transfer</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle>Total</v-list-item-subtitle>
                  <v-list-item-title>R$ 24000</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="4" class="text-center">
        <v-icon>mdi-chevron-left</v-icon>
        <span class="text-body-1 font-weight-bold">Outubro/20</span>
        <v-icon>mdi-chevron-right</v-icon>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn text>
          <v-icon left>mdi-filter</v-icon>
          <span class="text-capitalize">Filtro</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <app-transaction-item v-for="item in transactions" :key="item.id" :transaction="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
import finances from "@/store/modules/finances";

	@Component
	export default class TransferencesView extends Vue {
		get transactions() {
    return finances.transactions;
  }
	}
</script>

<style scoped>

</style>