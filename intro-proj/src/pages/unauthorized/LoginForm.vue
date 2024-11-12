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
import axios from 'axios'; // Import axios

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
    async login() {
      try {
        // Ensure the formData is not empty
        if (!this.formData.username || !this.formData.password) {
          this.loginMessage = 'Please enter your username and password.';
          return;
        }

        console.log('Attempting to log in with:', this.formData); // Debugging

        // Make POST request to backend login endpoint
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.formData.username,
          password: this.formData.password,
        });

        console.log('Response:', response.data); // Debugging

        // Handle successful login
        if (response.status === 200) {
          this.loginMessage = response.data.message;
          localStorage.setItem('userId', response.data.user.user_id); // Store user ID in local storage
          this.isLoggedIn = true; // Set login status
          this.$router.push('/authorized'); // Redirect to authorized page
        } else {
          this.loginMessage = 'Unexpected response from server.';
        }
      } catch (error) {
        console.error('Login error:', error); // Debugging
        // Handle error response
        if (error.response) {
          this.loginMessage = error.response.data.message || 'Invalid login credentials.';
        } else {
          this.loginMessage = 'Server error. Please try again later.';
        }
      }
    },
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
