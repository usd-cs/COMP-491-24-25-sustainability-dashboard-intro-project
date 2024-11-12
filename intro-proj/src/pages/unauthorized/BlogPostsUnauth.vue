<template>
  <div>
    <h1>Recent Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.post_id">
        <p>{{ post.content }}</p>
        <!-- Show comments if any exist (assuming comments are part of the post) -->
        <ul>
          <li v-for="comment in post.comments" :key="comment.comment_id">
            <p>{{ comment.content }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// Import the functions to fetch posts and user status
import { fetchPosts, fetchUserStatus } from '@/postsServices';

export default {
  data() {
    return {
      posts: [],
      isLoggedIn: false,  // Track if the user is logged in
      isAdmin: false,  // Track if the user is an admin
    };
  },
  methods: {
    // Fetch all posts from the backend
    async loadPosts() {
      this.posts = await fetchPosts();
    },

    // Fetch the user status to check if logged in or if the user is an admin
    async loadUserStatus() {
      const userStatus = await fetchUserStatus();
      this.isLoggedIn = userStatus.isLoggedIn;
      this.isAdmin = userStatus.isAdmin;
    },
  },
  created() {
    // Load posts and user status when the component is created
    this.loadPosts();
    this.loadUserStatus();
  },
};
</script>
