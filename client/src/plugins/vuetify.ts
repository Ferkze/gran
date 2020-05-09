import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const dark = window.localStorage.getItem('theme.dark')

export default new Vuetify({
  theme: {
    dark: dark ? JSON.parse(dark) : false
  }
})
