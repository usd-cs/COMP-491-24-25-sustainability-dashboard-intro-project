<template>
  <div>
    <h2>Recent Posts</h2>

    <!-- New Post Form -->
    <form @submit.prevent="submitPost">
      <input v-model="newPostContent" placeholder="What's on your mind?" />
      <button type="submit">Add Post</button>
    </form>

    <ul>
      <li v-for="post in posts" :key="post.post_id">
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],  // Array to hold posts
      newPostContent: '', // Content for a new post
    };
  },
  methods: {
    // Submit a new post
    async submitPost() {
      if (this.newPostContent.trim()) {
        try {
          const response = await axios.post('http://localhost:3000/api/posts', {
            content: this.newPostContent
          });
          if (response.status === 200) {
            this.posts.push(response.data);  // Add the new post to the list
            this.newPostContent = '';  // Clear the input field
          }
        } catch (error) {
          console.error('Error adding post:', error);
          alert('Failed to add post. Please try again.');
        }
      }
    },
  },
  created() {
    this.fetchPosts();  // Fetch posts on component creation
  },
  methods: {
    // Fetch posts from the backend
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
};
</script>
