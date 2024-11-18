import { loadPostsAndComments, addPost, deletePost } from '../postsServices';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('postsServices', () => {
  describe('loadPostsAndComments', () => {
    it('should return data when fetch is successful', async () => {
      const mockData = [{ id: 1, content: 'Test post', comments: [] }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await loadPostsAndComments();
      expect(result).toEqual({ data: mockData, error: null });
    });

    it('should handle error when fetch fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadPostsAndComments();
      expect(result).toEqual({
        data: null,
        error: 'Error fetching posts and comments. Please try again later.',
      });
    });
  });

  describe('addPost', () => {
    it('should successfully add a post and return data', async () => {
      const mockPostContent = 'This is a new post';
      const mockResponse = { id: 1, content: mockPostContent };
  
      // Mock axios.post to return the mock response
      axios.post.mockResolvedValueOnce({
        data: mockResponse, // Simulating server response
      });
  
      const result = await addPost(mockPostContent);
  
      // Check if the returned result contains correct data
      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeNull(); // Ensure there is no error
    });
  
    it('should handle error when adding post fails with server error', async () => {
      const mockPostContent = 'This is a new post';
      const mockErrorResponse = 'Server error message';
  
      // Mock axios.post to reject with an error that has a response
      axios.post.mockRejectedValueOnce({
        response: {
          data: mockErrorResponse, // Simulating a server-side error
        },
      });
  
      try {
        await addPost(mockPostContent);
      } catch (error) {
        // Check if the error is thrown correctly
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Failed to add post');
      }
    });
  
    it('should handle error when adding post fails with network error', async () => {
      const mockPostContent = 'This is a new post';
      const mockNetworkErrorMessage = 'Network error';
  
      // Mock axios.post to reject with a network error (no response)
      axios.post.mockRejectedValueOnce({
        message: mockNetworkErrorMessage, // Simulating network error
      });
  
      try {
        await addPost(mockPostContent);
      } catch (error) {
        // Check if the error is thrown correctly
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Failed to add post');
      }
    });
  });

  describe('deletePost', () => {
    it('should return data when post is deleted successfully', async () => {
      const mockData = { success: true };
      axios.delete.mockResolvedValueOnce({ data: mockData });

      const result = await deletePost(1);
      expect(result).toEqual({ data: mockData, error: null });
    });

    it('should handle error when deleting a post fails', async () => {
      axios.delete.mockRejectedValueOnce({
        response: { data: { message: 'Failed to delete post' } },
      });

      const result = await deletePost(1);
      expect(result).toEqual({ data: null, error: 'Failed to delete post' });
    });

    it('should return error for invalid post ID', async () => {
      const result = await deletePost(null);
      expect(result).toEqual({ data: null, error: 'Invalid post ID' });
    });
  });
});
