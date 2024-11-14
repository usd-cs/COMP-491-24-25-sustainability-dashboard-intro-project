// postsService.js
import axios from 'axios';

export async function loadPosts() {
  try {
    const response = await axios.get('http://localhost:3001/api/posts/get_posts');
    console.log('Posts fetched:', response.data);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error);
    return { data: null, error: 'Error fetching posts. Please try again later.' };
  }
}

export async function loadComments() {
  try {
    const response = await axios.get('http://localhost:3001/api/posts/get_comments');
    console.log('Posts fetched:', response.data);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error);
    return { data: null, error: 'Error fetching posts. Please try again later.' };
  }
}