<template>
  <view class="container">
      <text>LoginScreen</text>
      <text-input
        :style="{ padding: 8, margin: 8, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }"
        placeholder="Login"
        hint="hint"
      >
      </text-input>
      <text-input
        :style="{ padding: 8, margin: 8, width: 150, height: 40, borderColor: 'gray', borderWidth: 1 }"
        placeholder="Senha"
        type="password"
        hint="hint"
      >
      </text-input>
      <button
        :on-press="submitLogin"
        title="Entrar"
        color="#841584"
        accessibility-label="Botão de entrar"
      />
  </view>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    submitLogin: function() {
      alert('You are logged in')
    }
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
