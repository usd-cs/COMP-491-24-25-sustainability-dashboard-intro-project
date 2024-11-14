
import axios from 'axios';

export async function loadPostsAndComments() {
  try {
    // Fetch posts with their comments from the single API endpoint
    const response = await axios.get('http://localhost:3001/api/posts/get_posts');
    
    console.log('Posts and Comments fetched:', response.data);

    // Return combined data
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching posts and comments:', error.response ? error.response.data : error);
    return { data: null, error: 'Error fetching posts and comments. Please try again later.' };
  }
}
/*

export async function addPost() {
  if (this.newPostContent.trim()) {
    try {
      // Send the content of the new post to the backend
      const response = await axios.post('http://localhost:3002/api/posts/add_posts', {
        content: this.newPostContent  // Send content to the backend
      });

      if (response.status === 200) {
        // Successfully added post, update the posts list and clear the input
        this.posts.push(response.data);  // Add the new post to the list
        this.newPostContent = '';  // Clear the input field
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please try again.');
    }
  }
}
*/