import axios from 'axios';

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/posts'); // API endpoint to get posts
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Fetch user status (whether logged in or an admin)
export const fetchUserStatus = async () => {
  try {
    const response = await axios.get('/api/user/status'); // API endpoint to check user status
    return response.data; // Expected to return { isLoggedIn: boolean, isAdmin: boolean }
  } catch (error) {
    console.error('Error fetching user status:', error);
    return { isLoggedIn: false, isAdmin: false };
  }
};
