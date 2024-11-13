<template>
  <div class="authorized-page">
    <div class="header">
      <h1>Welcome back, you’re logged in!</h1>
      <button @click="logout">Log Out</button>
    </div>

    <div class="main-content">
      <div class="left-column">
        <!-- Blog posts component for authorized users -->
        <BlogPostsAuth />
      </div>

      <div class="right-column">
        <!-- Create Post component for authorized users to add new posts -->
        <CreatePost @post-submitted="addPost" />
      </div>
    </div>
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
<style scoped>
/* Container for the whole authorized page */
.authorized-page {
  padding: 20px;
}

/* Header section with the Welcome message and Log Out button */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  text-align: center;
  flex-grow: 1; /* Ensures the heading takes available space */
}

.header button {
  align-self: flex-end; /* Aligns the Log Out button to the right */
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

/* Main content section with two columns */
.main-content {
  display: flex;
  gap: 20px;
}

/* Left column for recent posts */
.left-column {
  flex: 2;
  padding-right: 20px;
}

/* Right column for Create Post form */
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
