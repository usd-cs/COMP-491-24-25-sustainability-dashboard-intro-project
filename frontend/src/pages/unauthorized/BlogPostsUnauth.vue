<template>
  <div>
    <h1>Recent Posts</h1>

    <!-- Loading state -->
    <div v-if="loading">
      <p>Loading posts...</p>
    </div>

    <!-- Error message -->
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Check if there are posts, and display a message if not -->
    <div v-if="!loading && posts.length === 0">
      <p>No posts available.</p>
    </div>

    <!-- Display posts -->
    <ul v-if="!loading">
      <li v-for="post in posts" :key="post.post_id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.contents }}</p>

        <!-- Show comments if they exist -->
        <ul v-if="post.comments && post.comments.length">
          <li v-for="comment in post.comments" :key="comment.comment_id">
            <p>{{ comment.contents }}</p>
          </li>
        </ul>
        <div v-else>
          <p>No comments available for this post.</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { loadPosts } from '@/postsServices';

export default {
  data() {
    return {
      posts: [],
      loading: true,
      errorMessage: '',
    };
  },
  methods: {
    async fetchPosts() {
      this.loading = true; // Set loading to true before fetching
      const { data, error } = await loadPosts();
      if (error) {
        this.errorMessage = error;
      } else {
        this.posts = data;
      }
      this.loading = false; // Set loading to false once request is done
    },
  },
  created() {
    this.fetchPosts(); // Call the fetchPosts method when the component is created
  },
};
</script>

<style scoped>
/* Add some basic styling for loading and error messages */
p {
  font-size: 1rem;
  color: #333;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 1rem;
}

.loading, .error-message {
  color: #f00;
}
</style>
