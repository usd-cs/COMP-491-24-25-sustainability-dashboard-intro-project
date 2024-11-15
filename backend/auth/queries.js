import { query } from '../database_connection.js';

// Query to get user by username
export const queryUserByUsername = async (username) => {
  const sql = 'SELECT * FROM forum_schema."User" WHERE username = $1';
  //console.log(query(sql, [username])) promise { <pending> }
  return await query(sql, [username]);
  
};


