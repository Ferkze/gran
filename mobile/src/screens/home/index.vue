<template>
  <nb-container>
    <nb-content padder>
      <nb-h1
        :style="{ marginBottom: 8, marginTop: 16 }"
        class="text-color-white"
      >
        Finance Platform
      </nb-h1>
    </nb-content>
    <nb-footer>
      <nb-footer-tab>
        <nb-button
          active
          full
          :on-press="navigateToLogin"
        >
          <nb-text>Entrar</nb-text>
        </nb-button>
      </nb-footer-tab>
    </nb-footer>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native"

export default {
  data: () => ({
    text: '',
    stylesObj: {
      logoContainerStyle: {
        marginTop: Dimensions.get("window").height / 8
      },
      logoStyle: {
        left: Platform.OS === "android" ? 40 : 50,
        top: Platform.OS === "android" ? 35 : 60
      },
      btnContainer: {
        alignSelf: "center",
      }
    }
  }),
  methods: {
    onPressLearnMore: function() {
      alert(this.text)
    },
    navigateToLogin: function() {
      this.navigation.navigate('Login')
    },
  },
  props: {
    navigation: {
      type: Object
    }
  },
}
</script>
