<template>
    <div>
      <form @submit.prevent="submitPost">
        <input v-model="postContent" placeholder="Enter post content" />
        <button type="submit">Add Post</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postContent: '',
      };
    },
    methods: {
      submitPost() {
        if (this.postContent.trim()) {
          this.$emit('post-submitted', this.postContent);
          this.postContent = '';  // Clear input field
        }
      },
    },
  };
  </script>
  