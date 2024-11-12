<template>
  <div class="unauthorized-page">
    <h1>Welcome!</h1>
    <p>Please log in to access more features.</p>

    <!-- Display the BlogPostsUnauth component -->
    <BlogPostsUnauth />
    
    <!-- Login Form Component -->
    <LoginForm @login="handleLogin" />
  </div>
</template>

<script>
import BlogPostsUnauth from '@/pages/unauthorized/BlogPostsUnauth.vue';
import LoginForm from './LoginForm.vue';

export default {
  name: 'UnauthorizedPage',
  components: {
    BlogPostsUnauth,
    LoginForm,
  },
  methods: {
    handleLogin() {
      // Redirect to the Authorized page on successful login
      this.$router.push({ name: 'Authorized' });
    }
  }
};
</script>

<style scoped>
.unauthorized-page {
  text-align: center;
  padding: 20px;
}
</style>
