import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';

// Configuration for the database connection
const dbConfig = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5434',
    database: 'postgres',
};

// Path to the exported SQL schema file
const schemaFilePath = './forum_schema.sql';

// Read the SQL file
const schemaSQL = fs.readFileSync(schemaFilePath, 'utf8');

// Create a PostgreSQL client and connect
const client = new Client(dbConfig);

async function createSchemaAndAddUser() {
    try {
        console.log('Connecting to the database...');
        await client.connect();
        console.log('Connected to the database.');

        // Skip creating the schema if it already exists
        const schemaExists = await client.query(
            `SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'forum_schema';`
        );

        if (schemaExists.rows.length === 0) {
            console.log('Schema does not exist, creating schema...');
            await client.query('CREATE SCHEMA forum_schema');
            console.log('Schema created successfully.');
        } else {
            console.log('Schema already exists, skipping schema creation.');
        }

        // Check if the Users table exists, and if not, create it
        const tableExists = await client.query(`
            SELECT to_regclass('forum_schema.Users');
        `);

        if (tableExists.rows[0].to_regclass === null) {
            console.log('Users table does not exist, creating table...');
            await client.query(`
                CREATE TABLE forum_schema.Users (
                    user_id SERIAL PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    admin BOOLEAN DEFAULT FALSE,
                    password VARCHAR(255) NOT NULL
                );
            `);
            console.log('Users table created successfully.');
        } else {
            console.log('Users table already exists, skipping table creation.');
        }

        // Insert a new user into the Users table
        const insertUserSQL = `
            INSERT INTO forum_schema.Users (user_id, username, admin, password) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id) DO NOTHING;  -- Ignore if the user exists
        `;
        await client.query(insertUserSQL, [1, 'user123', false, 'pw123']);
        console.log('User added successfully, or user already exists.');

    } catch (error) {
        console.error('Error creating schema or adding user:', error.message);
    } finally {
        console.log('Closing the database connection...');
        await client.end();
        console.log('Database connection closed.');
    }
}

// Run the script
createSchemaAndAddUser();
