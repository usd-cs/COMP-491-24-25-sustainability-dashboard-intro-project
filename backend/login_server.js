const bcrypt = require('bcrypt');
const { Pool } = require('pg');


// PostgreSQL connection setup
const pool = new Pool({
   user: 'kaelananderson',
   password: 'kaelan1',
   host: 'localhost',
   port: '5434',
   database: 'pls_work',
});


// Function to add a new user
const addUser = async (username, plaintextPassword) => {
   try {
       // Step 1: Find the current maximum user_id
       const maxIdQuery = `SELECT MAX(user_id) AS max_user_id FROM forum_schema."User";`;
       const maxIdResult = await pool.query(maxIdQuery);
       const maxUserId = maxIdResult.rows[0].max_user_id || 0; // Default to 0 if no users exist


       // Step 2: Calculate a new unique user_id
       const newUserId = maxUserId + 1;


       // Step 3: Hash the password
       const hashedPassword = await bcrypt.hash(plaintextPassword, 10);


       // Step 4: Insert the user with the new user_id
       const insertQuery = `
         INSERT INTO forum_schema."User" (user_id, username, password)
         VALUES ($1, $2, $3)
         RETURNING *;
       `;
       const values = [newUserId, username, hashedPassword];


       // Execute the query
       const result = await pool.query(insertQuery, values);


       console.log('User added successfully:', result.rows[0]);
   } catch (err) {
       console.error('Error adding user:', err);
   } finally {
       pool.end(); // Close the connection pool
   }
};


// Example Usage: Add a user
const username = 'kaelan';
const password = 'kaelan1';
addUser(username, password);



