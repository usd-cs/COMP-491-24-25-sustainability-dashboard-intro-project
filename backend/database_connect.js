const { Pool } = require('pg');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5432;

const dbConfig = {
    user: 'kaelananderson',
    password: 'kaelan1',
    host: 'localhost',
    port: '5434',
    database: 'intro_proj_db',
};


const pool = new Pool(dbConfig);

app.use(express.json());

// Enable CORS (running on port 5173)
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this port
    methods: ['GET', 'POST'], // Allow specific methods if needed
}));

async function clearTables() {
    const client = await pool.connect();
    try {
        await client.query(`DELETE FROM forum_schema."Comment";`);
        await client.query(`DELETE FROM forum_schema."Post";`);
        await client.query(`DELETE FROM forum_schema."User";`);
        console.log('All tables cleared');
    } catch (err) {
        console.error('Error clearing tables', err);
    } 
}


async function insertSampleData() {
    const client = await pool.connect();
    try {
        console.log('Connected to PostgreSQL database');
        
        // Clear tables before inserting new data (for testing)
        await clearTables();

        // Insert a sample user
        const insertUserQuery = `
            INSERT INTO forum_schema."User" (user_id, username, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const hashedPassword = await bcrypt.hash('kaelan_pword', 10); // Hash the password
        const userResult = await client.query(insertUserQuery, ['1', 'kaelan', hashedPassword]);
        const userId = userResult.rows[0].user_id;
        console.log('Inserted user:', userId);

        // Insert a sample post associated with the user
        const insertPostQuery = `
            INSERT INTO forum_schema."Post" (post_id, contents, user_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        await client.query(insertPostQuery, ['1', 'this is a test post', '1']);
        
        // Insert a sample comment associated with the user and post
        const insertCommentQuery = `
            INSERT INTO forum_schema."Comment" (comment_id, contents, user_id, post_id)
            VALUES ($1, $2, $3, $4)
            RETURNING comment_id;
        `;
        await client.query(insertCommentQuery, ['1', 'this is a test comment', '1', '1']);
        
        console.log('Sample data inserted');
    } catch (err) {
        console.error('Error executing query', err);
    } 
}

// Route to handle login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Debugging: Log the incoming request data
    console.log('Login attempt:', { username, password });

    if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const client = await pool.connect();
    try {
        // Query the database to find the user by username
        console.log('Querying database for username:', username); // Debugging: Log the username being queried
        const selectUserQuery = `SELECT * FROM forum_schema."User" WHERE username = $1;`;
        const userResult = await client.query(selectUserQuery, [username]);

        // Debugging: Log the result of the database query
        console.log('User query result:', userResult.rows);

        if (userResult.rows.length === 0) {
            console.log('No user found with the given username');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Assuming the password is stored as a hashed value, use bcrypt to compare
        const user = userResult.rows[0];
        console.log('Comparing password for user:', user.username); // Debugging: Log the user being checked
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Debugging: Log the result of the password comparison
        console.log('Password comparison result:', passwordMatch);

        if (passwordMatch) {
            // If password matches, login is successful
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Server error' });

}});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


insertSampleData();
