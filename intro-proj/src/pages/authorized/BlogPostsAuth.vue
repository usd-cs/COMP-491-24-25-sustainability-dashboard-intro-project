<template>
  <div>
    <h2>Recent Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.post_id">
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],  // Initialize with an empty array to hold posts
    };
  },
  methods: {
    // Fetch posts from the backend
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/posts'); // Adjust URL based on your setup
        if (response.ok) {
          const posts = await response.json();
          this.posts = posts; // Update posts data
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },

    // Handle adding a new post
    async addPost(content) {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });
        if (response.ok) {
          const newPost = await response.json();
          this.posts.push(newPost);  // Add the new post to the posts list
        } else {
          console.error('Failed to add post');
        }
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  },
  created() {
    this.fetchPosts();  // Fetch posts when the component is created
  }
};
</script>
