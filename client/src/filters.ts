import Vue from 'vue'

Vue.filter('formatCurrency', (value: any): string => {
	return parseFloat(value)
		.toFixed(2)
		.toString()
		.replace('.', ',')
})


Vue.filter('formatCash', (value: any): string => {
	return parseFloat(value)
		.toFixed(0)
		.toString()
})

const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
]
Vue.filter('monthName', (value: number): string => {
	return months[value-1]
})