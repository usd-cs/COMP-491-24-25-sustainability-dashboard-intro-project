<template>
    <button v-if="isLoggedIn" @click="logout">
        Log out
    </button>
</template>

<script>
// Export the logout function to allow testing
export function logout() {
    localStorage.removeItem('authToken'); // Adjust according to auth setup
    // Redirect to home
    this.$router.push('/');
    this.$emit('logout');
}

export default {
    name: 'LogoutButton',
    props: {
        isLoggedIn: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        logout
    }
};
</script>
