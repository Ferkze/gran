import Vue from 'vue'

Vue.filter('formatCurrency', (value: any): string => {
	return parseFloat(value)
		.toFixed(2)
		.toString()
		.replace('.', ',')
})
