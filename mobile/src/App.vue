<template>
  <root>
    <app-navigator/>
  </root>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import { Root } from "native-base";
import HomeScreen from './screens/home/index'
import LoginScreen from './screens/login/index'

const StackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, headerTitle: 'Home' },
    Login: { screen: LoginScreen, headerTitle: 'Login'},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator, Root },
  data: () => ({
  }),
}
</script>
