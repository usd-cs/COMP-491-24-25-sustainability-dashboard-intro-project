import { addComment, deleteComment } from '../../../backend/comments/queries.js';
import { query } from '../../../backend/database_connection.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the query function in database_connection.js
vi.mock('../../../backend/database_connection.js', () => ({
  query: vi.fn(),
}));

describe('addComment', () => {
  beforeEach(() => {
    // Reset all mocks before each test to avoid shared state
    vi.resetAllMocks();
  });

  it('should successfully add a comment and return data', async () => {
    const mockCommentContent = 'This is a new comment';
    const mockUserId = 1;
    const mockPostId = 2;
    const mockResponse = { comment_id: 123, contents: mockCommentContent, user_id: mockUserId, post_id: mockPostId };

    // Mock the database call to return the mock response
    query.mockResolvedValueOnce([{ next_comment_id: 123 }]); // Simulate getting next comment ID
    query.mockResolvedValueOnce([mockResponse]); // Simulate inserting the comment

    const result = await addComment(mockCommentContent, mockUserId, mockPostId);

  // Verify the result matches the mock response
  expect(result).toEqual(mockResponse);
  expect(query).toHaveBeenCalledTimes(2); // Ensure both queries were executed
  });

  it('should handle error when adding comment fails with database error on fetching next comment ID', async () => {
    const mockCommentContent = 'This is a new comment';
    const mockUserId = 1;
    const mockPostId = 2;

    // Mock the database call to throw an error on the first query
    query.mockRejectedValueOnce(new Error('Database error when fetching next comment ID'));

    try {
      await addComment(mockCommentContent, mockUserId, mockPostId);
    } catch (error) {
      // Ensure the error is thrown and contains the correct message
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Database error when fetching next comment ID');
    }
    expect(query).toHaveBeenCalledTimes(1); // Ensure only the first query was executed
  });

  it('should handle error when adding comment fails with database error on inserting the comment', async () => {
    const mockCommentContent = 'This is a new comment';
    const mockUserId = 1;
    const mockPostId = 2;

    // Mock the first query to succeed and the second query to fail
    query.mockResolvedValueOnce([{ next_comment_id: 123 }]); // Simulate getting next comment ID
    query.mockRejectedValueOnce(new Error('Database error when inserting comment'));

    try {
      await addComment(mockCommentContent, mockUserId, mockPostId);
    } catch (error) {
      // Ensure the error is thrown and contains the correct message
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Database error when inserting comment');
    }
    expect(query).toHaveBeenCalledTimes(2); // Ensure both queries were executed
  });
});

describe('deleteComment', () => {
  beforeEach(() => {
    // Reset all mocks before each test to avoid shared state
    vi.resetAllMocks();
  });

  it('should successfully delete a comment and return data', async () => {
    const mockCommentId = 123;
    const mockResponse = { comment_id: mockCommentId, contents: 'This is a comment', user_id: 1, post_id: 2 };

    // Mock the database call to return the mock response
    query.mockResolvedValueOnce([mockResponse]); // Simulate deleting the comment

    const result = await deleteComment(mockCommentId);

    // Verify the result matches the mock response
    expect(result).toEqual(mockResponse);
    expect(query).toHaveBeenCalledTimes(1); // Ensure the query was executed
  });

  it('should handle error when deleting comment fails with database error', async () => {
    const mockCommentId = 123;

    // Mock the database call to throw an error
    query.mockRejectedValueOnce(new Error('Database error when deleting comment'));

    try {
      await deleteComment(mockCommentId);
    } catch (error) {
      // Ensure the error is thrown and contains the correct message
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Database error when deleting comment');
    }
    expect(query).toHaveBeenCalledTimes(1); // Ensure the query was executed
  });

  it('should handle error when comment to delete is not found', async () => {
    const mockCommentId = 123;

    // Mock the database call to return an empty array
    query.mockResolvedValueOnce([]); // Simulate comment not found

    try {
      await deleteComment(mockCommentId);
    } catch (error) {
      // Ensure the error is thrown and contains the correct message
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`Comment with ID ${mockCommentId} not found!`);
    }
    expect(query).toHaveBeenCalledTimes(1); // Ensure the query was executed
  });
});