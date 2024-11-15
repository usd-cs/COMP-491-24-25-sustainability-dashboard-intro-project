import axios from 'axios';

export async function loadPostsAndComments() {
  try {
    const response = await axios.get('http://localhost:3001/api/posts/get_posts');
    
    console.log('Posts and Comments fetched:', response.data);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error fetching posts and comments:', error.response ? error.response.data : error);
    return { data: null, error: 'Error fetching posts and comments. Please try again later.' };
  }
}

export async function addPost(postContent) {
  try {
    const response = await axios.post('http://localhost:3001/api/posts/add_posts', {
      content: postContent, 
    });

    console.log('Post added:', response.data); 
    return { data: response.data, error: null };  
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error('Error adding post:', errorMessage);
    throw new Error('Failed to add post');  
  }
}


export async function deletePost(postId) {
  try {
    const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error deleting post:', error.response?.data || error.message);
    return { data: null, error: error.response?.data?.message || 'An error occurred' };
  }
}

export async function addComment(commentContent, postId) {
  try {
    const response = await axios.post('http://localhost:3002/api/comments/add_comment', {
      content: commentContent,
      post_id: postId,
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error adding comment:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      return { data: null, error: error.response.data.message || 'Failed to add comment' };
    } 
    else if (error.request) {
      console.error('Request data:', error.request);
      return { data: null, error: 'No response received from the server. Please check your connection.' };
    } 
    else {
      console.error('Error message:', error.message);
      return { data: null, error: 'An error occurred while adding the comment. Please try again later.' };
    }
  }
};
export async function deleteComment(commentId) {
  if (!commentId) {
    return { data: null, error: 'Comment ID is required' };
  }

  try {
    // Make the DELETE request with commentId in the URL
    const response = await axios.delete(`http://localhost:3002/api/comments/${commentId}`);
    
    // Log success response if needed
    console.log('Successfully deleted comment:', response.data);
    
    return { data: response.data, error: null };
  } catch (error) {
    // Handle different error scenarios
    if (error.response) {
      console.error('Error deleting comment:', error.response.data);
      return { data: null, error: error.response.data.message || 'An error occurred while deleting the comment' };
    } else {
      console.error('Error deleting comment:', error.message);
      return { data: null, error: 'An unexpected error occurred' };
    }
  }
}
