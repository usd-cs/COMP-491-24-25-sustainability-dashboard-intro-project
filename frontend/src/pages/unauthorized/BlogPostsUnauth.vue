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
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      isLoggedIn: false,  // Track if the user is logged in
      isAdmin: false,  // Track if the user is an admin
    };
  },
  methods: {
    // Fetch all posts directly from the backend using axios
    async loadPosts() {
      try {
        const response = await axios.get('http://localhost:3000/get_posts'); // Replace with your backend URL
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.posts = []; 
      }
    },

    // Check if user is logged in by looking for userId in localStorage
    loadUserStatus() {
      const userId = localStorage.getItem('userId');
      
      // If userId exists in localStorage, assume the user is logged in
      if (userId) {
        this.isLoggedIn = true;
        // Optionally fetch additional user info (like admin status) if needed
        this.checkIfAdmin(userId);
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    },

    // Simulated function to check if the user is an admin
    async checkIfAdmin(userId) {
      try {
        // Make a request to fetch user details based on userId (optional)
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/status`);
        this.isAdmin = response.data.isAdmin;
      } catch (error) {
        console.error('Error checking user admin status:', error);
        this.isAdmin = false;
      }
    },
  },
  created() {
    // Load posts and user status when the component is created
    this.loadPosts();
    this.loadUserStatus();
  },
};
</script>
