import { query } from '../database_connection.js'; // Adjust the path to match your project structure

export const addComment = async (content, post_id) => {
  const userId = 2; // Replace with actual user ID if needed
  if (!content) {
    console.error("Content for comment cannot be null or empty.");
    throw new Error("Content cannot be null or empty.");
  }
  const getNextCommentIdSQL = `
    SELECT COALESCE(MAX(comment_id), 0) + 1 
    AS next_comment_id FROM forum_schema."Comment";
  `;
  try {
    const result = await query(getNextCommentIdSQL);
    if (!result || !result[0]) {
      console.error('Failed to retrieve next comment ID');
      throw new Error('Failed to retrieve next comment ID');
    }
    const nextCommentId = result[0].next_comment_id;
    console.log('Next Comment ID:', nextCommentId);
    const insertCommentSQL = `
      INSERT INTO forum_schema."Comment" (comment_id, contents, user_id, post_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const insertResult = await query(insertCommentSQL, [nextCommentId, content, userId, post_id]);
    console.log(`Comment with ID ${nextCommentId} added successfully to post_id ${post_id} for user_id ${userId}`);
    return insertResult[0]; // Return the newly inserted comment
  } catch (error) {
    console.error('Error adding comment to database:', error);
    throw new Error('Error adding comment: ' + error.message);
  }
};
export const removeComment = async (commentId) => {
  const deleteCommentSQL = `
    DELETE FROM forum_schema."Comment" 
    WHERE comment_id = $1
    RETURNING *;
  `;
  try {
    console.log(`Attempting to delete comment with comment_id ${commentId}`);
    const result = await query(deleteCommentSQL, [commentId]);

    // Assuming `result` is an array with the first item being the deleted comment
    if (result && result.length > 0) {
      console.log(`Comment with comment_id ${commentId} deleted successfully.`);
      return result[0];  // Return the first item in the result, which is the deleted comment
    } else {
      console.log(`No comment found or deleted for comment_id ${commentId}. Maybe it doesn't exist.`);
      return null;
    }
  } catch (error) {
    console.error('Error deleting comment from database:', error);
    console.error('Error details:', error.message);  // Log the specific error message
    console.error('Error stack:', error.stack);    // Log the full stack trace

    // Check for foreign key constraints or other violations
    if (error.code === '23503') {
      console.error('Foreign key violation: Could not delete comment due to existing dependencies.');
    }
    throw error;
  }
};
