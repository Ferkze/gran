import Vue from 'vue'
import accounts from './store/modules/accounts'
import finances from './store/modules/finances'

Vue.filter('formatCurrency', (value: any): string => {
	return parseFloat(value)
		.toFixed(2)
		.toString()
		.replace('.', ',')
})

Vue.filter('formatCash', (value: any): string => {
	if (!value) return '0'
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

Vue.filter('categoryName', (value: any): string => {
	return finances.categories.find(c => c.id == value)?.name || ''
})

Vue.filter('accountName', (value: any): string => {
	return accounts.accounts.find(a => a.id == value)?.name || ''
})

Vue.filter('formatDate', (value: any): string => {
	const split = value.split('-')
	return `${split[2]}/${split[1]}/${split[0]}`
})