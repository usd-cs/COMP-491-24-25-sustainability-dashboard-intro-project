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
  const userId = 2
  // SQL query to get the next post_id by finding the highest existing post_id
  const getNextPostIdSQL = `
    SELECT COALESCE(MAX(post_id), 0) + 1 AS next_post_id
    FROM forum_schema."Post";
  `;

  try {
    // Get the next post_id
    const result = await query(getNextPostIdSQL);
    const postId = result[0].next_post_id; // Extract the next post_id

    // SQL query to insert a new post with content, user_id, and the newly generated post_id
    const insertPostSQL = `
      INSERT INTO forum_schema."Post" (post_id, contents, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const insertResult = await query(insertPostSQL, [postId, contents, userId]);

    console.log(`Post with ID ${postId} added successfully for user_id ${userId}!`);
    return insertResult[0];  // Return the newly inserted post
  } catch (error) {
    console.error('Error inserting post into database:', error);
    throw error;  // Rethrow the error to be handled by the calling function
  }
};
