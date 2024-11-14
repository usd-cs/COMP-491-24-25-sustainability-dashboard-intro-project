import pkg from 'pg'; // Import the entire 'pg' package as the default
const { Client } = pkg; // Destructure Client from the imported pkg object
import bcrypt from 'bcryptjs';  // Import bcrypt for password hashing

// Configuration for the database connection
const dbConfig = {
  user: 'kaelananderson',
  password: 'kaelan1',
  host: 'localhost',
  port: '5434',
  database: 'intro_proj_db',
};

// Create a PostgreSQL client and connect
const client = new Client(dbConfig);

async function addUsers(users) {
    try {
        // Connect to the database
        console.log('Connecting to the database...');
        await client.connect();

        // Loop through the array of users and add each one
        for (const user of users) {
            const { userId, username, admin, password } = user;

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the user into the forum_schema."User" table
            const insertUserSQL = `INSERT INTO forum_schema."User" (user_id, username, admin, password) 
                                   VALUES ($1, $2, $3, $4)`;
            await client.query(insertUserSQL, [userId, username, admin, hashedPassword]);

            console.log(`User with ID ${userId} added successfully!`);
        }
    } catch (error) {
        console.error('Error adding users:', error.message);
    } finally {
        // Close the database connection
        console.log('Closing the database connection...');
        await client.end();
        console.log('Database connection closed.');
    }
}

// Array of users to be added
const users = [
    { userId: 2, username: 'user123', admin: false, password: 'pw123' },
    { userId: 3, username: 'user456', admin: false, password: 'pw456' },
    { userId: 4, username: 'user789', admin: true, password: 'pw789' }
];

// Run the function to add the users
addUsers(users);
