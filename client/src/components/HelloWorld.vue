<template>
	<v-container fluid class="pa-0">
		<section class="height-100vh">
			<!-- <v-img
				gradient="0.25turn, rgba(63, 135, 166, 0.1), rgb(235, 248, 225), rgba(246, 157, 60, 0.1)"
				:height="parallaxHeight"
				:src="require('../assets/holding-cash-lg.jpg')"
			> -->
				<v-container class="fill-height">
					<v-row justify="center">
						<v-col tag="h1" cols="12" class="text-center">
							<span class="display-2 font-weight-light">BEM-VINDO AO</span>
							<br>
							<span class="display-4 font-weight-black">G R A N</span>
						</v-col>
						<v-col v-if="!loggedIn" cols="12" class="text-center">
							<v-btn rounded x-large outlined @click="$router.push('/cadastrar')">Criar minha conta</v-btn>
						</v-col>
						<v-col v-else cols="12" class="text-center">
							<v-btn rounded x-large outlined @click="$router.push('/dashboard')">Acessar Portal</v-btn>
						</v-col>
					</v-row>
				</v-container>
			<!-- </v-img> -->
		</section>
		<v-row class="text-center">
			<v-col cols="12">
				<v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
			</v-col>

			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
					{{ msg }}
				</h1>
				<p class="subheading font-weight-regular">
					<router-link to="/entrar">
						Register
					</router-link>
					<span> now to start your Pathway to <b>Financial Freedom</b>!</span>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import auth from '../store/modules/auth'

@Component({
	name: 'HelloWorld'
})
export default class HelloWorld extends Vue {
	@Prop(String) msg!: string

	get parallaxHeight() {
		return window.innerHeight - 64
	}

	get loggedIn() {
		return auth.isAuthenticated
	}

}
</script>

<style lang="scss" scoped>
.height-100vh {
	height: 100vh;
}
</style>