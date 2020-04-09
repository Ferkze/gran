<template>
  <nb-container>
    <nb-header :style="{ marginTop: 28 }">
      <nb-left>
        <nb-button transparent>
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Login</nb-title>
      </nb-body>
    </nb-header>
    <nb-form :style="{ padding: 16 }">
      <nb-item
        rounded
        :style="{ marginBottom: 12 }"
        :success="emailValid"
      >
        <nb-input
          v-model="login"
          placeholder="Email"
          type="email"
        />
      </nb-item>
      <nb-item
        rounded
        :style="{ marginBottom: 12 }"
        :success="passwordValid"
      >
        <nb-input
          v-model="password"
          placeholder="Senha"
          type="password"
          return
        />
      </nb-item>
      <nb-button block rounded :onPress="submitLogin">
        <nb-text>Entrar</nb-text>
      </nb-button>
    </nb-form>
  </nb-container>
</template>

<script>
export default {
  computed: {
    emailValid: function() {
      if (this.login.indexOf('@') < 1) {
        return false
      } if (this.login.indexOf('.') < 3) {
        return false
      }
      return true
    },
    passwordValid: function() {
      if (this.password.length > 5) {
        return true
      }
      return false
    }
  },
  data: () => ({
    login: '',
    password: ''
  }),
  methods: {
    submitLogin: async function() {
      if (!this.emailValid) {
        alert('Email inválido')
        return
      }
      if (!this.passwordValid) {
        alert('Senha inválida')
        return
      }
      try {
        const res = await fetch('http://localhost:9090/api/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
        const data = await res.json()
        alert(data)
      } catch (error) {
        console.error('erro no axios', error.message) 
        alert(error.message)       
      }
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
