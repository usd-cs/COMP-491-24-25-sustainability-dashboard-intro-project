<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="formData.username" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="formData.password" />
      </div>

      <button type="submit">Login</button>
    </form>
    <p v-if="loginMessage">{{ loginMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      loginMessage: '',
      isLoggedIn: false,
    };
  },
  methods: {
    login() {
      const validCredentials = {
        username: 'user123',
        password: 'pword123',
      };

      if (
        this.formData.username === validCredentials.username &&
        this.formData.password === validCredentials.password
      ) {
        this.loginMessage = 'Login successful!';
        this.isLoggedIn = true;
        const authToken = 'auth-token-123';
        localStorage.setItem('authToken', authToken);
        this.$emit('login');
        this.$router.push('/authorized');
      } else {
        this.loginMessage = 'Invalid username or password.';
      }
    },
  },
  mounted() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: green;
  text-align: center;
}
</style>
