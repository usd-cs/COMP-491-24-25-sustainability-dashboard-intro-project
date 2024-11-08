const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
    user: 'kaelananderson',
    password: 'kaelan1',
    host: 'localhost',
    port: '5434',
    database: 'intro_proj_db',
};

// create a new PostgreSQL client
const client = new Client(dbConfig);

async function clearTables() {
    try {
        // clear tables in the correct order to avoid foreign key constraint issues
        // this was just for testing purposes so you can rerun the script
        await client.query(`DELETE FROM forum_schema."Comment";`);
        await client.query(`DELETE FROM forum_schema."Post";`);
        await client.query(`DELETE FROM forum_schema."User";`);
        console.log('All tables cleared');
    } catch (err) {
        console.error('Error clearing tables', err);
    }
}

async function insertSampleData() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
        // clear tables before inserting new data
        await clearTables();

        // insert a sample user
        const insertUserQuery = `
            INSERT INTO forum_schema."User" (user_id, username, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const userResult = await client.query(insertUserQuery, ['1', 'kaelan', 'kaelan_pword']);
        const userId = userResult.rows[0].user_id;
        console.log('Inserted user:', userId);

        const selectUser = `SELECT * FROM forum_schema."User";`;
        const selectUserResult = await client.query(selectUser);
        console.log('All users:', selectUserResult.rows);

        // insert a sample post associated with the user
        const insertPostQuery = `
            INSERT INTO forum_schema."Post" (post_id, contents, user_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        const postResult = await client.query(insertPostQuery, ['1', 'this is a test post', '1']);
        const postId = postResult.rows[0].post_id;
        console.log('Inserted post:', postId);

        const selectPost = `SELECT * FROM forum_schema."Post";`;
        const selectPostResult = await client.query(selectPost);
        console.log('All posts:', selectPostResult.rows);

        // insert a sample comment associated with the user and post
        const insertCommentQuery = `
            INSERT INTO forum_schema."Comment" (comment_id, contents, user_id, post_id)
            VALUES ($1, $2, $3, $4)
            RETURNING comment_id;
        `;
        const commentResult = await client.query(insertCommentQuery, ['1', 'this is a test', '1', '1']);
        const commentId = commentResult.rows[0].comment_id;
        console.log('Inserted comment:', commentId);

        const selectComment = `SELECT * FROM forum_schema."Comment";`;
        const selectCommentResult = await client.query(selectComment);
        console.log('All comments:', selectCommentResult.rows);

    } catch (err) {
        console.error('Error executing query', err);
    } finally {
        await client.end();
        console.log('Connection to PostgreSQL closed');
    }
}

insertSampleData();
