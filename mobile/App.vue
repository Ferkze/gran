<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import HomeScreen from './screens/HomeScreen.vue'
import LoginScreen from './screens/LoginScreen.vue'

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
  data: () => ({
    title: 'Finance App',
    text: ''
  }),
  methods: {
      onPressLearnMore: function() {
          alert(this.text)
      }
  },
}
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
