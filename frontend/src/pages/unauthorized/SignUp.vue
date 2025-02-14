<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const message = ref("");

    const handleSignup = async () => {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username.value, password: password.value, admin: false }),
        });

        const data = await response.json();
        if (response.ok) {
          message.value = "Signup successful! You can now log in.";
        } else {
          message.value = data.message;
        }
      } catch (error) {
        message.value = "Error signing up. Please try again.";
      }
    };

    return { username, password, message, handleSignup };
  },
};
</script>

<style>
input {
  display: block;
  margin: 8px 0;
  padding: 8px;
}
button {
  margin-top: 10px;
}
</style>