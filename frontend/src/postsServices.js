
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
