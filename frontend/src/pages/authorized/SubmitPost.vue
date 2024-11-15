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
        console.log(this.newPostContent);  // Corrected reference
        try {
          const { data, error } = await addPost(this.newPostContent);
          if (error) {
            alert(error);
          } else {
            console.log('New post added:', data);
            this.$emit('post-added', data); // Emit the new post to the parent
            this.newPostContent = ''; // Clear the input field
          }
        } catch (error) {
          console.error('Error adding post:', error);
          alert('Failed to add post. Please try again.');
        }
      }
    },
  },
};
</script>
