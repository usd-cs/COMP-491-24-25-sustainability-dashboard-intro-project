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
        async login() {
            try {
                /* Logic here not done yet, complete after setting up
                backend to test axios*/ 
                const response = await axios.post('http://localhost:5434/login', this.formData);

                if (response.status === 200) {
                    this.loginMessage = "Login successful!";
                } else {
                    this.loginMessage = "Invalid username or password";
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.loginMessage = "Invalid username or password";
                } else {
                    this.loginMessage = "Server error";
                }
            }
        },
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
