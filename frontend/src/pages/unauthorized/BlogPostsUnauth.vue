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
        <h2>{{ post.post_contents }}</h2>
        <p>Posted by User {{ post.user_id }}</p>

        <!-- Show comments if they exist -->
        <div v-if="post.comments && post.comments.length">
          <h3>Comments:</h3>
          <ul>
            <li v-for="comment in post.comments" :key="comment.comment_id">
              <p><strong>Comment by User {{ comment.user_id }}:</strong></p>
              <p>{{ comment.comment_contents }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
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
