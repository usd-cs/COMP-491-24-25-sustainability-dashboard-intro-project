import { query } from '../database_connection.js'; // Adjust the path to match your project structure



export const addComment = async (contents, user_id, post_id) => {
  // SQL query to get the next comment_id by finding the highest existing comment_id
  const getNextCommentIdSQL = `
    SELECT COALESCE(MAX(comment_id), 0) + 1 AS next_comment_id
    FROM forum_schema."Comment";
  `;

  try {
    // Get the next comment_id
    const result = await query(getNextCommentIdSQL);
    const commentId = result[0].next_comment_id; // Extract the next comment_id

    // SQL query to insert a new comment with content, user_id, post_id, and the newly generated comment_id
    const insertCommentSQL = `
      INSERT INTO forum_schema."Comment" (comment_id, contents, user_id, post_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const insertResult = await query(insertCommentSQL, [commentId, contents, user_id, post_id]);

    console.log(`Comment with ID ${commentId} added successfully for user_id ${user_id} on post_id ${post_id}!`);
    return insertResult[0]; // Return the newly inserted comment
  } catch (error) {
    console.error('Error inserting comment into database:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const deleteComment = async (comment_id) => {
  // SQL query to delete a comment by comment_id
  const deleteCommentSQL = `
    DELETE FROM forum_schema."Comment"
    WHERE comment_id = $1
    RETURNING *;
  `;

  try {
    const result = await query(deleteCommentSQL, [comment_id]);

    if (result.length === 0) {
      throw new Error(`Comment with ID ${comment_id} not found!`);
    }

    console.log(`Comment with ID ${comment_id} deleted successfully!`);
    return result[0]; // Return the deleted comment
  } catch (error) {
    console.error('Error deleting comment from database:', error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}