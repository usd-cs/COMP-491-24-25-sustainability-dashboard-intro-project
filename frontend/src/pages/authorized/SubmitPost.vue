<template>
  <div>
    <!-- New Post Form -->
    <form @submit.prevent="submitPost">
      <input v-model="newPostContent" placeholder="What's on your mind?" />
      <button type="submit">Add Post</button>
    </form>
  </div>
</template>

<script>
import { addPost } from '@/postsServices';  // Import the addPost function from postsServices

export default {
  data() {
    return {
      newPostContent: '', // Content for a new post
    };
  },
  methods: {
    async submitPost() {
      if (this.newPostContent.trim()) {
        try {
          // Send the newPostContent to the addPost function
          const newPost = await addPost(this.newPostContent); 
          console.log('New post added:', newPost);
          this.$emit('post-added', newPost); // Emit the new post to the parent
          this.newPostContent = ''; // Clear the input field
        } catch (error) {
          console.error('Error adding post:', error);
          alert('Failed to add post. Please try again.');
        }
      }
    },
  },
}
</script>
