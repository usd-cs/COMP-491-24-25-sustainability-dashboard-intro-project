
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

export async function deletePost(postId) {
  try {
    // Ensure the postId is valid before making the request
    if (!postId) {
      throw new Error("Invalid post ID");
    }

    const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`);

    // Return success data or custom response
    return { data: response.data, error: null };
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // Handle server-side errors
      console.error('Error deleting post:', error.response.data || error.response.statusText);
      return { data: null, error: error.response.data?.message || 'Server error occurred' };
    } else if (error.request) {
      // Handle request errors (e.g., no response received)
      console.error('No response from server:', error.request);
      return { data: null, error: 'No response from server' };
    } else {
      // Handle other types of errors (e.g., invalid URL)
      console.error('Error setting up request:', error.message);
      return { data: null, error: error.message || 'An unexpected error occurred' };
    }
  }
}
