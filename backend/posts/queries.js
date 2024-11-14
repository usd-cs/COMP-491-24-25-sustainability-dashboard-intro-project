import { query } from '../database_connection.js'; // Ensure this imports the query function

// Fetch all posts with their associated comments
export const getAllPosts = async () => {
  const sql = `
    SELECT 
      p.post_id, 
      p.contents AS post_contents, 
      c.comment_id, 
      c.contents AS comment_contents, 
      c.user_id 
    FROM forum_schema."Post" p
    LEFT JOIN forum_schema."Comment" c ON p.post_id = c.post_id;
  `;
  return await query(sql); // Call the reusable query function
};

export const addNewPost = async (contents) => {
  const userId = 2;  // Hardcoding user_id to 2, but ideally this would come from the logged-in user
  const postId = 5;  // In a real scenario, you might want to generate this dynamically

  // SQL query to insert a new post with content and user_id, and return the inserted post
  const insertPostSQL = `
    INSERT INTO forum_schema."Post" (post_id, contents, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    // Use query function to execute the insert statement
    const result = await query(insertPostSQL, [postId, contents, userId]);

    // Return the first (and only) inserted post from the result
    console.log(`Post with ID ${postId} added successfully for user_id ${userId}!`);
    return result[0];  // Assuming `result` is an array of rows returned
  } catch (error) {
    console.error('Error inserting post into database:', error);
    throw error;  // Rethrow the error to be handled by the calling function
  }
};


// Remove a post by ID
export const removePostById = async (postId) => {
  const sql = 'DELETE FROM forum_schema."Post" WHERE post_id = $1 RETURNING *';
  try {
    const result = await query(sql, [postId]);
    return result.rows[0];  // Return the deleted post (if any)
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
