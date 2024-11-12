// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Create an Express app
const app = express();
const port = 3000;

// Database configuration
const pool = new Pool({
  user: 'kaelananderson',      // replace with your PostgreSQL username
  password: 'kaelan1',         // replace with your PostgreSQL password
  host: 'localhost',           // database host
  port: '5434',                // database port
  database: 'intro_proj_db',   // database name
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Database Connection
pool.query('SELECT * FROM Users', (err, res) => {
  if (err) {
    console.error('Database connection error:', err); // Log if the database connection fails
  } else {
    console.log('Database query successful:', res.rows); // Log the users for verification
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login request received:', { username, password });

    // Query the database for the user
    const query = 'SELECT * FROM forum_schema."User" WHERE username = $1';
    const { rows } = await pool.query(query, [username]);

    if (rows.length === 0) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    console.log('User found:', user);

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', passwordMatch);

    if (passwordMatch) {
      console.log('Login successful for user:', username);
      return res.status(200).json({ message: 'Login successful', userId: user.user_id });
    } else {
      console.log('Password does not match for user:', username);
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error); // Log any unexpected errors
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
