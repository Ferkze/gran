<template>
	<v-container fluid class="pa-0">
		<!-- Seção inicial da primeira página -->
		<section class="height-100vh backgroundImage">
				<v-container class="fill-height">
					<v-row>
						<!--Texto introdutórios-->
						<v-col tag="h1" cols="6">
							<p class="display-4 font-weight-black white--text">Toda a finança do seu dia a dia na palma da sua mão</p>
							<br>
							<p class="display-2 font-weight-light  white--text">Melhor aplicativo de finanças no mercado. Simples e intuitivo de utilizar</p>
							<br>
							<!--Botão de Cadastro (Caso não esteja logado)-->
							<v-btn v-if="!loggedIn" block large outlined @click="$router.push('/cadastrar')" class="white--text">Crie sua conta</v-btn>
							<!--Botão para acessar o Dashboard(Caso esteja logado)-->
							<v-btn v-else block large outlined @click="$router.push('/dashboard')" class="white--text">Acessar Portal</v-btn>
						</v-col>
					</v-row>	
				</v-container>
		</section>

		<!-- Seção com Cards de informações do granFinance -->
		<section class="height-100vh backgroundGray">
			<v-container class="fill-height">
				<!-- Primeiros textos -->
				<v-col tag="h1" cols="4">
					<v-row class="display-2 font-weight-black">
						<p class="white--text">Controle seus gastos</p>
					</v-row>
					<v-row class="display-1">
						<p class="white--text">A qualquer momento do dia</p>
					</v-row>
				</v-col>
				<!--Seção dos Cards-->
				<v-col cols ="12">
					<!--Bloco A com 3 Cards-->
					<v-row>
						<v-col cols="4">

							<v-container>
								<v-card outlined>
									<v-avatar class="profile" size="60" tile>
										<img class="paddingBasico" src="../assets/icones/cloudStorage.svg">
									</v-avatar>
									<v-card-title class="paddingTituloCard font-weight-black">
										ARMAZENAMENTO NUVEM
									</v-card-title>
									<v-card-text class="marginTextoCard">
										Todos os dados resguardados na nuvem. Backup diários com sincronização mobile  desktop
									</v-card-text>
								</v-card>
							</v-container>

						</v-col>

						<v-col cols="4">
							<v-container outlined>
								<v-card>
									<v-avatar class="profile" size="60" tile>
										<img class="paddingBasico" src="../assets/icones/celularSeguranca.svg">
									</v-avatar>
									<v-card-title class="paddingTituloCard font-weight-black">
										SEGURANÇA DE DADOS
									</v-card-title>
									<v-card-text class="marginTextoCard ">
										Garantia de segurança dos seus dados.
										Controle de acesso com utilização de tokens e senhas configuráveis
									</v-card-text>
								</v-card>
							</v-container>
						</v-col>

						<v-col cols="4">
							<v-container>
								<v-card outlined>
									<v-avatar class="profile" size="60" tile>
										<img class="paddingBasico" src="../assets/icones/celularPeformace.svg">
									</v-avatar>
									<v-card-title class="paddingTituloCard font-weight-black">
										PERFORMACE DE QUALIDADE
									</v-card-title>
									<v-card-text class="marginTextoCard">
										Aplicativo criado com as melhores ferramentas do mercado. Permitindo que qualquer aparelho consiga utilizar o gran
									</v-card-text>
								</v-card>
							</v-container>

						</v-col>
					</v-row>

					<!--Bloco B com 3 Cards-->
					<v-row>
						<v-col cols="4">
							<v-container>
								<v-card outlined>
									<v-avatar class="profile" size="60" tile>
										<img class="paddingBasico" src="../assets/icones/celularPagamento.svg">
									</v-avatar>
									<v-card-title class="paddingTituloCard font-weight-black">
										CONTROLE DE PAGAMENTOS
									</v-card-title>
									<v-card-text class="marginTextoCard">
										Controle seus pagamentos mensais e acompanhe os gastos mensais.
										Sempre fique atenado de quando ocorrerá	
									</v-card-text>
								</v-card>
							</v-container>

						</v-col>

						<v-col cols="4">
							<v-container>
								<v-card outlined>
									<v-avatar class="profile" size="60" tile>
										<img class="paddingBasico" src="../assets/icones/celularMobile.svg">
									</v-avatar>
									<v-card-title class="paddingTituloCard font-weight-black">
										INTUITIVO E FÁCIL DE USAR
									</v-card-title>
									<v-card-text class="marginTextoCard">
										Com interfaces simples, o aplicativa dá boas vindas a qualquer tipo de usuário. Procurando ajudar e educar no assunto educação financeira.
									</v-card-text>
								</v-card>
							</v-container>

						</v-col>

						<v-col cols="4">
							<v-container>
								<v-card outlined>
									<v-avatar class="profile" size="60" tile>
										<img class="paddingBasico" src="../assets/icones/celularComunicacoes.svg">
									</v-avatar>
									<v-card-title class="paddingTituloCard font-weight-black">
										ATENDIMENTO E QA
									</v-card-title>
									<v-card-text class="marginTextoCard">
										Qualquer dúvida ou problema com o uso do Gran, a sessão de QA pode ajudar. Dúvidas mais específicas entre em contato com a equipe de atendimento
									</v-card-text>
								</v-card>
							</v-container>

						</v-col>
					</v-row>
				</v-col>
			</v-container>
		</section>

		<!-- Seção com Funcionalidades do granFinance -->
		<section class="height-100vh backgroundGray">
			<v-container class="fill-height">
				<v-col cols="10" tag="h1">
					<v-row>
							<h1 class="mb-2 display-3 font-weight-black">CONHEÇA AS FUNCIONALIDADES </h1>
					</v-row >
					<v-row>
							<h1  class="display-2 font-weight-light">Que facilitaram o seu controle financeiro</h1>
					</v-row >
				</v-col>
				
				<!--Primeira linha das funcionalidades-->
				<v-row>
					<v-col cols="12">
						<v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
					</v-col>
				</v-row>
				<!--Segunda linha das funcionalidades-->
				<v-row>
					<v-col cols="4">
						<v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
					</v-col>
					<v-col cols="8">
						<v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
					</v-col>
				</v-row>
				<!--Terceira linha das funcionalidades-->
				<v-row>
					<v-col cols="4">
						<v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
					</v-col>
					<v-col cols="4">
						<v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
					</v-col>
					<v-col cols="4">
						<v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
					</v-col>
				</v-row>
			</v-container>
		</section>
		<!-- Seção do Footer -->
		<section class="height-100vh backgroundFooter ">
			<v-container fluid class="fill-height">
				<!-- Texto inicial do Footer -->
				<v-container>
					<v-row>
						<v-col  cols="6">
							<p class="display-1 white--text">NOSSO APP</p>
							<h3 class="white--text">Baixe o aplicativo do granFinance e obtenha toda a mobilidade do nosso controle financeiro</h3>
							<v-btn v-if="!loggedIn" block large outlined @click="$router.push('/cadastrar')" class="white--text">Crie sua conta</v-btn>
						</v-col>
					</v-row>
				</v-container>
				<v-row>
					<!-- Primeira coluna do Footer -->
					<v-col cols="4">
						<v-container class="ma-1 backgroundFuncionalidades">
							<v-row>
								<v-col cols="6">
									<v-container class="ma-1 pl-4 backgroundGray">
										<v-row><img width="60" src="../assets/disponivelGoogleplay.png"></v-row>
										<v-row><img width="60" src="../assets/disponivelAppStore.png"></v-row>
										<v-row>
											<p>Redes Sociais</p>
										</v-row>
									</v-container>
								</v-col>
								<v-col cols="6">
									<v-container class="ma-1 pl-5 backgroundGray">
										<v-row>
											<p>Nossas Funcionalidades</p>
										</v-row>
										<v-row>
											<ol>
												<li>Funcionalidade A</li>
												<li>Funcionalidade B</li>
												<li>Funcionalidade C</li>
												<li>Funcionalidade D</li>
												<li>Funcionalidade E</li>
											</ol>
										</v-row>
									</v-container>
								</v-col>
							</v-row>
						</v-container>
					</v-col>
					<!-- Segunda coluna do Footer -->
					<v-col cols="4">
						<v-container class="ma-1 backgroundFuncionalidades">
							<v-row>
								<v-col cols="6">
									<v-container class="ma-1 pl-4 backgroundGray">
										<p>Capitais e Regiões Metropolitanas</p>
										<p>0800 0400 0440</p>
									</v-container>
								</v-col>
								<v-col cols="6">
									<v-container class="ma-1 pl-4 backgroundGray">
										<p>SAC 24H</p>
										<p>0800 0400 0444</p>
									</v-container>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-container class="ma-1 pl-4 backgroundGray">
										<p>Central do Shima de Relacionamentos</p>
										<p>9h as 20h - Segunda a Sábado, exceto feriados</p>
									</v-container>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-container class="ma-1 pl-4 backgroundGray">
										<p>email</p>
										<p>granFinance@granFinance.com.br</p>
									</v-container>
								</v-col>
							</v-row>
						</v-container>
					</v-col>
					<!-- Terceira coluna do Footer -->
					<v-col cols="4">
						<v-container class="ma-1 backgroundFuncionalidades">
							<v-row>
								<v-col cols="12">
									<v-container class="ma-1 pl-5 backgroundGray">
										<p>INICIATIVAS</p>
										<p>FATEC SÃO BERNARDO DO CAMPO</p>
									</v-container>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-container class="ma-1 pl-5 backgroundGray">
										<p>DESENVOLVEDORES</p>
										<ol>
											<li>Allan Silva</li>
											<li>Erick Matsunaga</li>
											<li>Fabio Gonçalvez</li>
											<li>Matheus Shimanoe</li>
										</ol>
									</v-container>
								</v-col>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<p class="white--text">© 2020 granFinances S.A. CNPJ: 33.224.4561/0001-73</p>
					</v-col>
					<v-col cols="8">
						<p class="white--text">Segurança no uso da internet | Termos de Uso e Política de Privacidade</p>
					</v-col>
				</v-row>
			</v-container>
		</section>
		
		
		
		<!-- <v-row class="text-center">
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
				</p>
			</v-col>
		</v-row> -->
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

.backgroundImage {
	background-image: url("../assets/imagemGran.jpg")
}

.backgroundGray {
	background-image: linear-gradient(#B1BAC0, #B1BACC);
}

.backgroundFooter {
	background-image: linear-gradient(#000000, #000111);
}

.backgroundFuncionalidades{
	background-image: linear-gradient(#F9F9F9, #FFFFFF);
}

.backgroundWhite{
	background-image: linear-gradient(#fff, #fff);
}

.height-100vh {
	height: 100vh;
}

.height-70vh {
	height: 70vh;
}

.paddingTituloCard {
	padding: 5px 16px 5px 16px;
}

.marginTextoCard{
	margin-left: 12px;
}

.paddingBasico {
	padding: 10px 10px 0 10px;
	margin-left: 20px; 
}

.margin-5{
	margin: 5px;
}

</style>