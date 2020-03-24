<template>
  <view class="container">
    <status-bar
        background-color="blue"
        bar-style="light-content"
    />
    <image
      :style="{width: 50, height: 50}"
      :source="{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}"
    />
    <text class="text-color-primary">{{ title }}</text>
    <text-input
        :style="{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}"
        v-model="text"
      />
      <button
        :on-press="onPressLearnMore"
        title="Learn More"
        color="#841584"
        accessibility-label="Learn more about this purple button"
      />
      <button
        :on-press="navigateToLogin"
        title="Login"
        color="#841584"
        accessibility-label="Login navigation button"
      />
  </view>
</template>

<script>
export default {
  data: () => ({
    title: 'Finance Home Page',
    text: ''
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
