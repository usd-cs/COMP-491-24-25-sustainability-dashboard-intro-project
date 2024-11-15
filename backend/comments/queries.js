import { query } from '../database_connection.js'; // Adjust the path to match your project structure

export const addComment = async (content, post_id) => {
  const userId = 2;  // Replace with actual user ID if needed

  const getMaxIdSql = `SELECT MAX(comment_id) AS max_id FROM forum_schema."Comment";`;
  try {
    const maxIdResult = await query(getMaxIdSql);
    const nextCommentId = maxIdResult.rows[0]?.max_id + 1 || 1;

    // Insert the new comment with the provided post_id
    const insertCommentSQL = `
      INSERT INTO forum_schema."Comment" (comment_id, contents, user_id, post_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await query(insertCommentSQL, [nextCommentId, content, userId, post_id]);

    console.log(`Comment with ID ${nextCommentId} added successfully to post_id ${post_id} for user_id ${userId}`);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding comment to database:', error);
    throw error;
  }
};

// Remove a comment by ID and handle dependencies
export const removeComment = async (commentId) => {
  const deleteCommentSQL = `
    DELETE FROM forum_schema."Comment" 
    WHERE comment_id = $1
    RETURNING *;  -- This will return the deleted row if it exists
  `;

  try {
    // Attempt to delete the comment
    console.log(`Attempting to delete comment with comment_id ${commentId}`);
    const result = await query(deleteCommentSQL, [commentId]);

    // Check if any rows were deleted
    if (result && result.rows && result.rows.length > 0) {
      console.log(`Comment with comment_id ${commentId} deleted successfully.`);
      return result.rows[0];  // Return the deleted comment object
    } else {
      console.log(`No comment found or deleted for comment_id ${commentId}. Maybe it doesn't exist.`);
      return null;
    }
  } catch (error) {
    console.error('Error deleting comment from database:', error);
    console.error('Error details:', error.message);  // Log the specific error message
    console.error('Error stack:', error.stack);    // Log the full stack trace

    // Check for foreign key constraints or other violations
    if (error.code === '23503') {  // Postgres foreign key violation error code
      console.error('Foreign key violation: Could not delete comment due to existing dependencies.');
    }

    // Rethrow the error so the calling function can handle it
    throw error;
  }
};
