<template>
  <div>
    <h2>Recent Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.post_id">
        <p>{{ post.content }}</p>

        <!-- Only show delete button if the user is an admin -->
        <button v-if="isAdmin" @click="removePost(post.post_id)">Delete Post</button>
        
        <!-- Show comment section -->
        <div v-for="comment in post.comments" :key="comment.comment_id">
          <p>{{ comment.content }}</p>

          <!-- Only show delete button for comments if the user is an admin -->
          <button v-if="isAdmin" @click="removeComment(comment.comment_id)">Delete Comment</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],  // Initialize with an empty array to hold posts
      isAdmin: false, // Flag to check if the user is an admin
    };
  },
  created() {
    this.fetchPosts();  // Fetch posts when the component is created
    this.checkAdminStatus(); // Check if the user is an admin when the component is created
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

    // Handle removing a post
    async removePost(postId) {
      if (this.isAdmin) {
        try {
          // Modify the URL to match your Express route for removing posts
          const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Remove the post from the list if successfully deleted
            this.posts = this.posts.filter(post => post.post_id !== postId);
          } else {
            console.error('Failed to delete post');
          }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      } else {
        alert('You do not have permission to delete posts.');
      }
    },

    // Handle removing a comment
    async removeComment(commentId) {
      if (this.isAdmin) {
        try {
          // Modify the URL to match your Express route for removing comments
          const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Remove the comment from the post's comments list
            this.posts.forEach(post => {
              post.comments = post.comments.filter(comment => comment.comment_id !== commentId);
            });
          } else {
            console.error('Failed to delete comment');
          }
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      } else {
        alert('You do not have permission to delete comments.');
      }
    },

    // Check if the user is an admin (for demonstration, this can be done based on your auth system)
    checkAdminStatus() {
      // Example: check the user role from local storage or an API call
      const userRole = localStorage.getItem('userRole'); 
      if (userRole === 'admin') {
        this.isAdmin = true;
      }
    }
  }
};
</script>

<style scoped>

</style>
