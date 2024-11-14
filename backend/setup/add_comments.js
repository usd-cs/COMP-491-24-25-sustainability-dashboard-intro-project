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

// Function to add a comment to a specific post
async function addComment(commentContents, postId, userId) {
    const client = new Client(dbConfig); // Recreate a client instance for each request

    try {
        // Connect to the database
        console.log('Connecting to the database...');
        await client.connect();

        // Check if the post exists in the Post table
        const checkPostSQL = 'SELECT * FROM forum_schema."Post" WHERE post_id = $1';
        const postResult = await client.query(checkPostSQL, [postId]);

        if (postResult.rows.length === 0) {
            console.log(`Post with post_id ${postId} does not exist!`);
            return;
        }

        // Insert a comment into the forum_schema."Comment" table
        const insertCommentSQL = `INSERT INTO forum_schema."Comment" (contents, post_id, user_id) 
                                  VALUES ($1, $2, $3)`;
        await client.query(insertCommentSQL, [commentContents, postId, userId]);
        console.log(`Comment added to post_id ${postId} by user_id ${userId}`);
    } catch (error) {
        console.error('Error adding comment:', error.message);
    } finally {
        // Close the database connection
        console.log('Closing the database connection...');
        await client.end();
        console.log('Database connection closed.');
    }
}

// Example usage to add comments to multiple posts
(async () => {
    // Array of post_id and user_id values
    const postIds = [1, 2, 3, 4];
    const userIds = [2, 3, 4];
    const comments = [
        'Great post!',
        'I totally agree with this.',
        'Interesting perspective.',
        'I have a different opinion on this.',
    ];

    // Add comments to posts
    for (let postId of postIds) {
        for (let userId of userIds) {
            const comment = comments[Math.floor(Math.random() * comments.length)]; // Random comment
            await addComment(comment, postId, userId);
        }
    }
})();
