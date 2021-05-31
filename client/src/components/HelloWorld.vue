<template>
  <v-container fluid class="pa-0">
    <!-- Seção inicial da primeira página -->
    <section class="min-h-100vh backgroundImage">
      <v-container fill-height>
        <v-row align-content="center" class="min-h-100vh">
          <v-col cols="12" md="8" lg="6">
            <h1
              class="text-center text-sm-start text-h3 text-sm-h2 text-xl-h1 font-weight-black white--text mb-8"
            >Simplicidade para suas finanças</h1>
            <p
              class="text-center text-sm-start text-h5 text-sm-h4 font-weight-light white--text"
            >O melhor aplicativo de finanças no mercado, agora na palma da sua mão</p>
            <br />
            <v-btn
              v-if="!loggedIn"
              block
              x-large
              outlined
              @click="$router.push('/cadastrar')"
              class="white--text"
            >Crie sua conta</v-btn>
            <v-btn v-else block x-large outlined @click="$router.push('/dashboard')" class="white--text">Acessar Portal</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Seção com Cards de informações do granFinance -->
    <section class="min-h-100vh backgroundGray">
      <v-container class="fill-height">
        <v-col class="mt-3" tag="h2" cols="12" md="8">
          <v-row class="text-h3 font-weight-black">
            <p class="white--text">Controle seus gastos</p>
          </v-row>
          <v-row class="text-h4">
            <p class="white--text">A qualquer momento do dia</p>
          </v-row>
        </v-col>
        <!--Seção dos Cards-->
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="card in benefitCards" :key="card.title">
              <v-card class="pt-2" min-height="220px" outlined>
                <v-list-item class="grow">
                  <v-list-item-avatar tile :height="card.imgHeight" :width="card.imgWidth">
                    <v-img :alt="card.title" :src="card.img"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="card.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-card-text class="px-5 px-md-6 px-lg-8" v-text="card.description" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </section>

    <!-- Seção com Funcionalidades do granFinance -->
    <!-- <section class="min-h-100vh backgroundGray">
      <v-container class="fill-height">
        <v-col cols="10" tag="h1">
          <v-row>
            <h1 class="mb-2 display-3 font-weight-black">CONHEÇA AS FUNCIONALIDADES</h1>
          </v-row>
          <v-row>
            <h1 class="display-2 font-weight-light">Que facilitaram o seu controle financeiro</h1>
          </v-row>
        </v-col>

        <v-row>
          <v-col cols="12">
            <v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
          </v-col>
          <v-col cols="8">
            <v-container class="fill-height ma-2 backgroundFuncionalidades"></v-container>
          </v-col>
        </v-row>
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
    </section>-->
    <!-- Seção do Footer -->
    <section class="backgroundFooter">
      <v-container class="fill-height">
        <v-row justify="center">
          <v-col cols="12" sm="7" md="5" lg="4" class="mt-10 text-center text-sm-start">
            <p class="text-h6 grey--text font-weight-bold mb-1">NOSSO APP</p>
            <p
              class="text-h5 white--text font-weight-medium"
            >baixe o aplicativo do granFinance e obtenha toda a mobilidade do nosso controle financeiro</p>
            <v-btn
              v-if="!loggedIn"
              x-large
              outlined
              rounded
              min-width="280px"
              @click="$router.push('/cadastrar')"
              class="white--text py-6 px-10"
            >Crie sua conta</v-btn>
          </v-col>
          <v-col cols="8" sm="5" md="4" lg="3" class="text-center">
            <v-img height="280" width="280" :src="require('../assets/gran-logo.svg')" :aspect-ratio="1" />
          </v-col>
        </v-row>

        <v-row class="px-4">
          <v-divider class="white"></v-divider>
        </v-row>

        <v-row class="white--text mt-5 px-8">
          <v-col cols="12" sm="2">
            <v-row>
              <p class="text-subtitle-2 grey--text font-weight-bold mb-1">BAIXE NOSSO APP</p>
            </v-row>
            <v-row>
              <img width="150" src="../assets/disponivelGoogleplay.png" />
            </v-row>
            <v-row>
              <img width="150" src="../assets/disponivelAppStore.png" />
            </v-row>
          </v-col>
          <v-col cols="12" sm="3">
            <v-row>
              <p class="text-subtitle-2 grey--text font-weight-bold mb-1">NOSSAS FUNCIONALIDADES</p>
            </v-row>
            <v-row>
              <ul>
                <li>Registro de transações</li>
                <li>Cadastro de contas</li>
                <li>Planejamentos</li>
                <li>Grupos financeiros</li>
                <li>Relatórios mensais</li>
              </ul>
            </v-row>
          </v-col>
          <!-- Segunda coluna do Footer -->
          <v-col cols="12" sm="4">
            <p class="text-subtitle-2 grey--text font-weight-bold mb-1">CENTRAL DO SHIMA DE RELACIONAMENTOS</p>
            <p>9h as 20h - Segunda a Sábado, exceto feriados</p>
            <p class="text-subtitle-2 grey--text font-weight-bold mb-1">EMAIL</p>
            <p>ferkze@gmail.com</p>
            <p class="text-subtitle-2 grey--text font-weight-bold mb-1">DESENVOLVEDOR</p>
            <p>
              <a href="https://github.com/Ferkze" target="_blank">Fabio Martins</a>
            </p>
          </v-col>
          <!-- Terceira coluna do Footer -->
          <v-col cols="12" sm="3">
            <p class="text-subtitle-2 grey--text font-weight-bold mb-1">INICIATIVAS</p>
            <p>FATEC SÃO BERNARDO DO CAMPO</p>
            <p class="text-subtitle-2 grey--text font-weight-bold mb-1">EQUIPE</p>
            <ul>
              <li>Allan Silva</li>
              <li>Erick Matsunaga</li>
              <li>Fabio Martins</li>
              <li>Matheus Shimanoe</li>
            </ul>
          </v-col>
        </v-row>

        <v-row class="px-4 mt-3">
          <v-divider class="white"></v-divider>
        </v-row>

        <v-row justify="space-between">
          <v-col cols="3">
            <p class="text-start mb-0 white--text">
              <span class="font-weight-regular">© 2021 gran</span>
              <span class="font-weight-light">finance</span>
            </p>
          </v-col>
          <v-col cols="9">
            <p class="text-end mb-0 white--text">Segurança no uso da internet | Termos de Uso e Política de Privacidade</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import auth from "../store/modules/auth";

@Component({
  name: "HelloWorld",
})
export default class HelloWorld extends Vue {
  @Prop(String) msg!: string;

  benefitCards = [
    {
      description:
        "Todos os dados são armazenados em nuvem, possibilitando a sincronização entre dispositivos desktop e mobile",
      img: "./icones/cloudStorage.svg",
      imgHeight: "51",
      imgWidth: "54",
      title: "ARMAZENAMENTO NUVEM",
    },
    {
      description:
        "Garantia de segurança dos seus dados. Controle de acesso e proteção contra roubo e indisponibilidade dos seus dados",
      img: "./icones/celularSeguranca.svg",
      imgHeight: "51",
      imgWidth: "42",
      title: "SEGURANÇA DE DADOS",
    },
    {
      description:
        "Aplicativo criado com as melhores ferramentas do mercado. Permitindo que qualquer aparelho consiga utilizar o gran",
      img: "./icones/celularPeformace.svg",
      imgHeight: "51",
      imgWidth: "42",
      title: "PERFORMACE DE QUALIDADE",
    },
    {
      description:
        "Controle seus pagamentos mensais e acompanhe os gastos mensais. Você tem controle e visibilidade do seu dinheiro",
      img: "./icones/celularPagamento.svg",
      imgHeight: "51",
      imgWidth: "42",
      title: "CONTROLE DE PAGAMENTOS",
    },
    {
      description:
        "Funcionalidades simples para que todos tenham acessibilidade à sua vida financeira",
      img: "./icones/celularMobile.svg",
      imgHeight: "51",
      imgWidth: "42",
      title: "INTUITIVO E FÁCIL DE USAR",
    },
    {
      description:
        "Conte com uma equipe de suporte pronta para te apoiar seu melhor controle financeiro",
      img: "./icones/celularComunicacoes.svg",
      imgHeight: "51",
      imgWidth: "42",
      title: "ATENDIMENTO E QA",
    },
  ];

  get parallaxHeight() {
    return window.innerHeight - 64;
  }

  get loggedIn() {
    return auth.isAuthenticated;
  }
}
</script>

<style lang="scss" scoped>
.backgroundImage {
  background-image: url("../assets/imagemGran.jpg");
}

.backgroundGray {
  background-image: linear-gradient(#b1bac0, #b1bacc);
}

.backgroundFooter {
  background-image: linear-gradient(
    180deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.backgroundFuncionalidades {
  background-image: linear-gradient(#f9f9f9, #ffffff);
}

.backgroundWhite {
  background-image: linear-gradient(#fff, #fff);
}

.min-h-100vh {
  min-height: calc(100vh - 64px);
}

.height-70vh {
  height: 70vh;
}

.paddingTituloCard {
  padding: 5px 16px 5px 16px;
}

.margin-5 {
  margin: 5px;
}
</style>