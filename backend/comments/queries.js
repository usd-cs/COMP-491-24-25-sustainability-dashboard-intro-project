import { query } from '../database_connection.js'; // Adjust the path to match your project structure



// Query to add a new comment
export const addComment = async (contents, user_id, post_id) => {
  const sql = `
    INSERT INTO forum_schema."Comment" (contents, user_id, post_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await query(sql, [contents, user_id, post_id]);
  return result.rows[0];  // Return the inserted comment object
};

// Query to remove a comment by ID (mark it as deleted)
export const removeComment = async (commentId) => {
  const sql = `
    UPDATE forum_schema."Comment"
    SET deleted_at = NOW()
    WHERE comment_id = $1
    RETURNING *;
  `;
  const result = await query(sql, [commentId]);
  return result.rows[0];  // Return the deleted comment object (with updated deleted_at timestamp)
};
