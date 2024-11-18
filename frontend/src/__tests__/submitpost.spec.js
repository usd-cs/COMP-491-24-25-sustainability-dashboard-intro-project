import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { submitPost } from '../submitpost';
import { submi}

// Mock axios to prevent actual network requests
vi.mock('axios');

describe('submitPost', () => {
  it('should add a post to the posts array when the API request is successful', async () => {
    // Arrange
    const posts = [];
    const newPostContent = 'Test Post Content';

    // Mock axios.post to return a successful response
    axios.post.mockResolvedValue({ 
      status: 200, 
      data: { post_id: 1, content: newPostContent }
    });

    // Act
    await submitPost(newPostContent, posts);

    // Assert
    expect(posts).toHaveLength(1);  // Check if the post was added
    expect(posts[0].content).toBe(newPostContent);  // Check if the content is correct
  });

  it('should not add a post when the content is empty', async () => {
    // Arrange
    const posts = [];
    const newPostContent = '';  // Empty content

    // Act
    await submitPost(newPostContent, posts);

    // Assert
    expect(posts).toHaveLength(0);  // No post should be added
  });

  it('should handle errors gracefully if the API request fails', async () => {
    // Arrange
    const posts = [];
    const newPostContent = 'Test Post Content';

    // Mock axios.post to simulate an error
    axios.post.mockRejectedValue(new Error('Failed to add post'));

    // Act
    await submitPost(newPostContent, posts);

    // Assert
    expect(posts).toHaveLength(0);  // No post should be added due to the error
  });

  it('should not add a post if the content only contains whitespace', async () => {
    // Arrange
    const posts = [];
    const newPostContent = '   ';  // Only whitespace

    // Act
    await submitPost(newPostContent, posts);

    // Assert
    expect(posts).toHaveLength(0);  // No post should be added
  });
});
