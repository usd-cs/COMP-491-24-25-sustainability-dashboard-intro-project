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

    <!-- Display posts -->
    <ul v-if="!loading" class="post-list">
      <li v-for="post in posts" :key="post.post_id" class="post">
        <div class="post-header">
          <h2>{{ post.post_contents }}</h2>
          <p class="post-meta">Posted by User {{ post.user_id }}</p>
        </div>

        <!-- Show comments if they exist -->
        <div v-if="post.comments && post.comments.length" class="comments-section">
          <h3>Comments:</h3>
          <ul class="comments-list">
            <li v-for="comment in post.comments" :key="comment.comment_id" class="comment">
              <p><strong>Comment by User {{ comment.user_id }}:</strong></p>
              <p>{{ comment.comment_contents }}</p>
            </li>
          </ul>
        </div>

        <div v-else class="no-comments">
          <p>No comments available for this post.</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { loadPostsAndComments } from '@/postsServices';

export default {
  data() {
    return {
      posts: [],
      loading: true,
      errorMessage: '',
    };
  },
  methods: {
    async fetchPostsAndComments() {
      this.loading = true; // Set loading to true before fetching
      const { data, error } = await loadPostsAndComments();

      if (error) {
        this.errorMessage = error;
      } else {
        // Parse and group comments by post_id
        const groupedPosts = this.groupPostsWithComments(data);
        this.posts = groupedPosts;
      }
      this.loading = false; // Set loading to false once request is done
    },

    // Method to group comments under their respective posts
    groupPostsWithComments(data) {
      const postsMap = {};

      // Iterate through the data and organize it by post_id
      data.forEach(item => {
        const { post_id, post_contents, user_id, comment_id, comment_contents } = item;

        // If the post doesn't exist in the postsMap, create it
        if (!postsMap[post_id]) {
          postsMap[post_id] = {
            post_id,
            post_contents,
            user_id,
            comments: []
          };
        }

        // Add the comment to the respective post
        postsMap[post_id].comments.push({
          comment_id,
          comment_contents,
          user_id
        });
      });

      // Convert postsMap object back to an array
      return Object.values(postsMap);
    },
  },
  created() {
    this.fetchPostsAndComments(); // Fetch posts and comments when the component is created
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

/* No comments available message styling */
.no-comments {
  font-style: italic;
  color: #aaa;
}
</style>
