<template>
  <v-row>
    <v-spacer />
    <v-col cols="4" class="text-center">
      <v-btn icon class="px-5" @click="prevMonth">
        <v-icon size="20">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="font-weight-light text-body-1 grey--text text--darken-3">{{ filter.month | monthName }} de {{ filter.year }}</span>
      <v-btn icon class="px-5" @click="nextMonth">
        <v-icon size="20">mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="4" class="text-right">
      <v-btn text>
        <v-icon left>mdi-filter</v-icon>
        <span class="text-capitalize">Filtro</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { TransactionFilter } from "@/models";
import auth from "@/store/modules/auth";
import finances from "@/store/modules/finances";
import { Component, Emit, PropSync, Vue } from "vue-property-decorator";

@Component
export default class TransactionFilterBar extends Vue {
	@PropSync('data', { type: Object, default: () => ({
		year: new Date().getFullYear(),
		month: new Date().getMonth()+1,
		user: auth.userId,
	})})
  filter!: TransactionFilter

	nextMonth() {
		if (!this.filter.month || !this.filter.year) return
		if (this.filter.month == 12) {
			this.filter.month = 1;
			this.filter.year++;
		} else {
			this.filter.month++;
		}
		this.filterTransaction();
	}

	prevMonth() {
		if (!this.filter.month || !this.filter.year) return
		if (this.filter.month == 1) {
			this.filter.month = 12;
			this.filter.year--;
		} else {
			this.filter.month--;
		}
		this.filterTransaction();
	}

  @Emit("filter")
	filterTransaction() {
		return this.filter
	}
}
</script>
