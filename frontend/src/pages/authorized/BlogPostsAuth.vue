<template>
  <div class="container">
    <h1 class="title">Recent Posts</h1>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <p>Loading posts...</p>
    </div>

    <!-- Error message -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Check if there are posts, and display a message if not -->
    <div v-if="!loading && posts.length === 0" class="no-posts">
      <p>No posts available.</p>
    </div>

    <!-- Display posts and add a trash button next to each -->
    <ul v-if="!loading && posts.length > 0" class="post-list">
      <li v-for="post in posts" :key="post.post_id" class="post">
        <div class="post-header">
          <h2>{{ post.contents }}</h2>
          <button @click="deletePost(post.post_id)" class="delete-button">Delete Post</button>
          <p class="post-meta">Posted by User {{ post.user_id }}</p>
        </div>

        <!-- Show comments if they exist -->
        <div v-if="post.comments && post.comments.length" class="comments-section">
          <h3>Comments:</h3>
          <ul class="comments-list">
            <li v-for="comment in post.comments" :key="comment.comment_id" class="comment">
              <p><strong>Comment by User {{ comment.user_id }}:</strong></p>
              <p>{{ comment.contents }}</p>
            </li>
          </ul>
        </div>

        <div v-else class="no-comments">
          <p>No comments available for this post.</p>
        </div>

        <!-- Add comment form -->
        <form @submit.prevent="addComment(post.post_id)" class="add-comment-form">
          <input
            v-model="newComments[post.post_id]"
            placeholder="Write a comment..."
            class="comment-input"
          />
          <button type="submit" class="add-comment-button">Add Comment</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import { loadPostsAndComments, deletePost as deletePostService } from '@/postsServices';

export default {
  data() {
    return {
      posts: [],
      loading: true,
      errorMessage: '',
      newComments: {}, // Object to hold new comment inputs keyed by post_id
    };
  },
  methods: {
    async fetchPostsAndComments() {
      this.loading = true;
      const { data, error } = await loadPostsAndComments();

      if (error) {
        this.errorMessage = error;
        this.loading = false;
        return;
      }

      this.posts = data;
      this.loading = false;
    },
    async deletePost(postId) {
      try {
        await deletePostService(postId);
        this.posts = this.posts.filter(post => post.post_id !== postId);
        console.log(`Post with ID ${postId} deleted successfully`);
      } catch (error) {
        this.errorMessage = 'Failed to delete post';
        console.error(error.message);
      }
    },
    addComment(postId) {
      const commentContent = this.newComments[postId]?.trim();
      if (commentContent) {
        const newComment = {
          comment_id: Date.now(), // Generate a unique ID
          user_id: 1, // Replace with the actual logged-in user ID
          contents: commentContent,
        };

        // Find the post and add the new comment
        const post = this.posts.find(post => post.post_id === postId);
        if (post) {
          if (!post.comments) {
            post.comments = [];
          }
          post.comments.push(newComment);
        }

        // Clear the input field
        this.newComments[postId] = '';
      }
    },
  },
  created() {
    this.fetchPostsAndComments();
  },
};
</script>

<style scoped>
/* Basic container styling */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
}

/* Title styling */
.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* Loading and error message styles */
.loading, .error-message {
  color: #f00;
  text-align: center;
}

/* Styling for no posts available message */
.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

/* Post list styling */
.post-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

/* Individual post styling */
.post {
  background-color: #007bff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  color: white;
}

.post-header {
  margin-bottom: 10px;
}

.post-meta {
  font-size: 0.9rem;
  color: #ddd;
}

/* Comments section styling */
.comments-section {
  margin-top: 15px;
}

.comments-list {
  list-style-type: none;
  padding-left: 0;
}

.comment {
  background-color: #e0f7fa;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  color: #00796b;
}

.comment p {
  margin: 0;
}

/* Add comment form */
.add-comment-form {
  display: flex;
  margin-top: 10px;
}

.comment-input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-comment-button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
