<template>
  <div class="login-form">
    <h2 v-if="!isLoggedIn">Login</h2>
    <form v-if="!isLoggedIn" @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input v-model="formData.username" type="text" id="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="formData.password" type="password" id="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="loginMessage">{{ loginMessage }}</p>
  </div>
</template>

<script>
import { login } from '@/login.js';

export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      loginMessage: '', // Message to display feedback
      isLoggedIn: false, // To track login status
    };
  },
  methods: {
    async handleLogin() {
      this.loginMessage = await login(this.formData, this.$router); // Call the login function
      if (this.loginMessage === 'Login successful') {
        this.isLoggedIn = true;
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form div {
  margin-bottom: 10px;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
}

.login-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.login-form button {
  padding: 10px;
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}

.login-form p {
  margin-top: 10px;
  color: red;
}
</style>