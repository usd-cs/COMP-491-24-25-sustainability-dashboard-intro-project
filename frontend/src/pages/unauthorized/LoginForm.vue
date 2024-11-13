<script>
import axios from 'axios'; 
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
