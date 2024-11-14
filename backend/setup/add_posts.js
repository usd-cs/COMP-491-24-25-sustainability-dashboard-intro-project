import pkg from 'pg'; // Import the entire 'pg' package as the default
const { Client } = pkg; // Destructure Client from the imported pkg object

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

async function addPosts(posts) {
    try {
        // Connect to the database
        console.log('Connecting to the database...');
        await client.connect();

        // Loop through the array of posts and insert each one
        for (const post of posts) {
            const { postId, contents, userId } = post;

            // Check if the user exists
            const checkUserSQL = 'SELECT * FROM forum_schema."User" WHERE user_id = $1';
            const userResult = await client.query(checkUserSQL, [userId]);

            if (userResult.rows.length === 0) {
                console.log(`User with user_id ${userId} does not exist!`);
                continue; // Skip this post if the user does not exist
            }

            // Insert the post into the forum_schema."Post" table
            const insertPostSQL = `INSERT INTO forum_schema."Post" (post_id, contents, user_id) 
                                   VALUES ($1, $2, $3)`;
            await client.query(insertPostSQL, [postId, contents, userId]);

            console.log(`Post with ID ${postId} added successfully for user_id ${userId}!`);
        }
    } catch (error) {
        console.error('Error adding posts:', error.message);
    } finally {
        // Close the database connection
        console.log('Closing the database connection...');
        await client.end();
        console.log('Database connection closed.');
    }
}

// Array of posts to be added
const posts = [
    { postId: 1, contents: 'Post for user 2', userId: 2 },
    { postId: 2, contents: 'Another post for user 3', userId: 3 },
    { postId: 3, contents: 'Another post for user 4', userId: 4 },
    { postId: 4, contents: 'A second post for user 2', userId: 2 }
];

// Run the function to add the posts
addPosts(posts);
