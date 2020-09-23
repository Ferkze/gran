<template>
	<v-form>
		<v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nome"
      required
    ></v-text-field>
		<v-text-field
      v-model="description"
      :counter="10"
      :rules="descriptionRules"
      label="Descrição"
      required
    ></v-text-field>
		<div class="mt-5">
			<span class="subheading">Categoria</span>
			<v-chip-group
				v-model="category"
				mandatory
				active-class="primary--text"
			>
				<v-chip v-for="c in categories" :key="c" :value="c" v-text="c" />
			</v-chip-group>
		</div>
		<div>
			<span class="subheading">Tipo do orçamento</span>
			<v-chip-group
				v-model="type"
				mandatory
				active-class="primary--text"
			>
				<v-chip v-for="t in types" :key="t" :value="t" v-text="t" />
			</v-chip-group>
		</div>
		<div v-if="type == 'Específico'">
			<span class="subheading">Subcategoria</span>
			<v-chip-group
				v-model="subcategory"
				mandatory
				active-class="primary--text"
			>
				<v-chip v-for="s in subcategories" :key="s" :value="s" v-text="s" />
			</v-chip-group>
		</div>
		<div class="mt-5">
			<span class="subheading">Agora projete a renda mensal</span>
			<v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="budgetEnd"
            label="Até o mês"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
				<v-date-picker v-model="budgetEnd" type="month"></v-date-picker>
        <v-date-picker v-model="budgetEnd" @input="dateMenu = false"></v-date-picker>
      </v-menu>
			
			<v-slider
				v-model="budget"
				label="Renda esperada"
				thumb-color="green"
				thumb-label="always"
			></v-slider>
			<span class="subheading">Renda esperada mensalmente: R$ {{ budget | formatCurrency }}</span>
			
		</div>
		<div class="mt-10">
			<v-range-slider
				v-model="budgetAmounts"
				:max="max"
				:min="min"
				label="Máximo"
				hide-details
				class="align-center"
			>
				<template v-slot:prepend>
					<v-text-field
						:value="budgetAmounts[0]"
						class="mt-0 pt-0"
						hide-details
						single-line
						type="number"
						style="width: 60px"
						@change="$set(budgetAmounts, 0, $event)"
					></v-text-field>
				</template>
				<template v-slot:append>
					<v-text-field
						:value="budgetAmounts[1]"
						class="mt-0 pt-0"
						hide-details
						single-line
						type="number"
						style="width: 60px"
						@change="$set(budgetAmounts, 1, $event)"
					></v-text-field>
				</template>
			</v-range-slider>
		</div>
	</v-form>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component
	export default class BudgetForm extends Vue {
		name = ''
		description = ''
		type = 'Geral'
		category = null
		subcategory = null
		budget = 0
		budgetAmounts = [0,50]
		budgetEnd = new Date().toISOString().substr(0, 7)

		dateMenu = false
		min = 0
		max = 100

		types = [
			'Geral',
			'Específico',
		]

		categories = [
			'Investimento',
			'Renda',
			'Gastos',
		]

		get subcategories() {
			switch (this.category) {
				case 'Investimento':
					return [
						'Ações',
						'Imóveis',
						'Internacional',
						'Renda fixa'
					]
					break;
				case 'Renda':
					return [
						'Salário',
						'Hora-extra',
						'Bicos',
					]
					break;
				case 'Gastos':
					return [
						'Alimentação',
						'Mercado',
						'Pet',
						'Saúde',
						'Móveis e equipamentos',
						'Presentes',
						'Higiene',
						'Beleza',
					]
					break;
				default:
					return []
					break;
			}
		}

		//Validation
		nameRules = [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		]
		descriptionRules = [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		]
		requiredRules = [
			v => !!v || 'Item is required'
		]
	}
</script>

<style scoped>

</style>