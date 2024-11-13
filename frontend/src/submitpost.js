import axios from 'axios';

export async function submitPost(newPostContent, posts) {
  if (newPostContent.trim()) {
    try {
      const response = await axios.post('http://localhost:3000/api/posts', {
        content: newPostContent
      });
      if (response.status === 200) {
        posts.push(response.data);  // Add the new post to the list
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please try again.');
    }
  }
}
