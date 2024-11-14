import { query } from '../database_connection.js'; // Adjust the path to match your project structure

// Query to get all posts
export const getAllPosts = async () => {
  const sql = 'SELECT * FROM forum_schema."Post"';
  return await query(sql);
};

// Query to add a new post
export const addPost = async (title, contents) => {
  const sql = 'INSERT INTO forum_schema."Post" (title, contents) VALUES ($1, $2) RETURNING *';
  return await query(sql, [title, contents]);
};

// Query to remove a post by ID
export const removePost = async (postId) => {
  const sql = 'DELETE FROM forum_schema."Post" WHERE post_id = $1 RETURNING *';
  return await query(sql, [postId]);
};

