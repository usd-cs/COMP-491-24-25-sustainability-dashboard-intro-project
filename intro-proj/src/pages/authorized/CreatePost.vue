<template>
  <div>
    <h2>Recent Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.post_id">
        <p>{{ post.content }}</p>

        <!-- Comment Form for each post -->
        <form @submit.prevent="submitComment(post.post_id)">
          <input v-model="post.commentContent" :placeholder="'Add a comment to ' + post.content" />
          <button type="submit">Add Comment</button>
        </form>

        <!-- Comments List for each post -->
        <ul>
          <li v-for="comment in post.comments" :key="comment.comment_id">
            <p>{{ comment.content }}</p>
            <!-- Show delete button for admins -->
            <button v-if="isAdmin" @click="removeComment(post.post_id, comment.comment_id)">Delete</button>
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
      posts: [],  // Array to hold posts
      isAdmin: false, // Check if user is admin
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },

    // Submit comment for a specific post
    async submitComment(postId) {
      const post = this.posts.find(p => p.post_id === postId);
      if (post.commentContent.trim()) {
        try {
          const response = await axios.post(`http://localhost:3000/api/comments`, {
            content: post.commentContent,
            post_id: postId
          });
          if (response.status === 200) {
            post.comments.push(response.data);  // Add the new comment to the post
            post.commentContent = '';  // Clear input field
          }
        } catch (error) {
          console.error('Error adding comment:', error);
          alert('Failed to add comment. Please try again.');
        }
      }
    },

    // Delete comment (only for admins)
    async removeComment(postId, commentId) {
      if (this.isAdmin) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/comments/${commentId}`);
          if (response.status === 200) {
            const post = this.posts.find(p => p.post_id === postId);
            post.comments = post.comments.filter(comment => comment.comment_id !== commentId);  // Remove comment
          }
        } catch (error) {
          console.error('Error deleting comment:', error);
          alert('Failed to delete comment. Please try again later.');
        }
      } else {
        alert('You do not have permission to delete comments.');
      }
    }
  },
  created() {
    this.fetchPosts();  // Fetch posts and comments on component creation
    this.checkAdminStatus();  // Check if the user is an admin
  },
  methods: {
    checkAdminStatus() {
      const userRole = localStorage.getItem('userRole'); // Check user role (admin or not)
      this.isAdmin = userRole === 'admin';
    }
  }
};
</script>
