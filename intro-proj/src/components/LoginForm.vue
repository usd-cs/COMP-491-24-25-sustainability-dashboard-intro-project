<template>
    <div>
        <form @submit.prevent="login">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="formData.username">

            <label for="password">Password</label>
            <input type="password" id="password" v-model="formData.password"/>

            <button type="submit">Login</button>
        </form>

        <p v-if="loginMessage">{{ loginMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data() {
        return {
            formData: {
                username: "",
                password: "",
            },
            loginMessage: "", // Message after login attempt
        };
    },
    methods: {
        validateForm() {
            if (!this.formData.username || !this.formData.password) {
                this.loginMessage = "Please enter both username and password.";
                return false;
            }
            return true;
        },
        async login() {
            if (!this.validateForm()) {
                return; // stop login attempt and present errors
            }

            try {
                // Send a POST request to backend
                const response = await axios.post('http://localhost:5173/login', this.formData);

                // Debugging: log the response to see what's returned from the backend
                console.log(response);

                if (response.status === 200) {
                    this.loginMessage = "Login successful!";
                } else {
                    this.loginMessage = "Invalid username or password";
                }
            } catch (error) {
                // Log the error for debugging purposes
                console.error(error);

                if (error.response) {
                    if (error.response.status === 401) {
                        this.loginMessage = "Invalid username or password";
                    } else {
                        this.loginMessage = `Error: ${error.response.status}`;
                    }
                } else {
                    this.loginMessage = "Server error";
                }
            }
        }
    },
};
</script>

<style scoped>
input {
    display: block;
    margin-bottom: 1rem;
    padding: 0.5rem;
}

button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
}
</style>
