import { query } from '../database_connection.js';

// Query to get user by username
export const queryUserByUsername = async (username) => {
  const sql = 'SELECT * FROM forum_schema."User" WHERE username = $1';
  return await query(sql, [username]);
};

// Query to insert a new user
export const insertUser = async (username, hashedPassword, admin) => {
  const sql = 'INSERT INTO forum_schema."User" (username, password, admin) VALUES ($1, $2, $3)';
  return await query(sql, [username, hashedPassword, admin]);
};