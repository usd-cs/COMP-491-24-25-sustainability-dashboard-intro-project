<template>
  <div class="authorized-page">
    <h1>Dashboard</h1>
    <p>Welcome back, you’re logged in!</p>
    <button @click="logout">Log Out</button>

    <!-- Create Post component for authorized users to add new posts -->
    <CreatePost @post-submitted="addPost" />

    <!-- Blog posts component for authorized users -->
    <BlogPostsAuth />
  </div>
</template>

<script>
import BlogPostsAuth from './BlogPostsAuth.vue';
import CreatePost from './CreatePost.vue';

export default {
  name: 'AuthorizedPage',
  components: {
    BlogPostsAuth,
    CreatePost
  },
  methods: {
    logout() {
      // Clear token and redirect to Unauthorized page
      localStorage.removeItem('authToken');
      this.$router.push({ name: 'Unauthorized' });
    },
    addPost(newPostContent) {
      // Pass the new post content to BlogPostsAuth
      this.$refs.blogPostsAuth.addPost(newPostContent);
    }
  }
};
</script>
