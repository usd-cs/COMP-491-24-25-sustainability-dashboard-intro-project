<template>
  <h1 class="blog-title">Blog</h1>
  <div class="unauthorized-page">

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
.blog-title {
  text-align: center; /* Centers the Blog heading horizontally */
  margin-bottom: 20px; /* Adds space between the title and the rest of the content */
}

.unauthorized-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding-left: 50px;
}

.unauthorized-page > * {
  flex: 1;
}
</style>