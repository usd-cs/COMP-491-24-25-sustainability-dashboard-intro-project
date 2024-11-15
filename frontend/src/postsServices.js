
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

export async function addPost(postContent) {
  try {
    const response = await axios.post('http://localhost:3001/api/posts/add_posts', {
      content: postContent,  // Sending post content
    });

    console.log('Post added:', response.data); // Log the response data from the server
    return { data: response.data, error: null };  // Return the new post data from the server
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error('Error adding post:', errorMessage); // Log the error message
    throw new Error('Failed to add post');  // Throw error for frontend to handle
  }
}
