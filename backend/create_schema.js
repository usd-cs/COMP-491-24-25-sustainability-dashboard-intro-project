const { Client } = require('pg'); // PostgreSQL client
const fs = require('fs');        // File system module

// Configuration for the database connection
const dbConfig = {
    user: 'kaelananderson',
    password: 'kaelan1',
    host: 'localhost',
    port: '5434',
    database: 'pls_work',
};

// Path to the exported SQL schema file
const schemaFilePath = './forum_schema.sql';

// Read the SQL file
const schemaSQL = fs.readFileSync(schemaFilePath, 'utf8');

// Create a PostgreSQL client and connect
const client = new Client(dbConfig);

async function createSchema() {
    try {
        console.log('Connecting to the database...');
        await client.connect();

        console.log('Connected to the database. Executing schema...');
        // Execute the schema SQL
        await client.query(schemaSQL);

        console.log('Schema created successfully!');
    } catch (error) {
        console.error('Error creating schema:', error.message);
    } finally {
        console.log('Closing the database connection...');
        await client.end();
        console.log('Database connection closed.');
    }
}

// Run the script
createSchema();
