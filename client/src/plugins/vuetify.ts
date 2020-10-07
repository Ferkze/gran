import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'

Vue.use(Vuetify)

const dark = window.localStorage.getItem('theme.dark')

export default new Vuetify({
	theme: {
		dark: dark ? JSON.parse(dark) : false,
		themes: {
			dark: {
				primary: '#00D2D1'
			},
			light: {
				primary: '#00D2D1',
				success: colors.green.accent4,
				warning: colors.yellow.darken2
			}
		}
	}
})
