import pkg from 'pg'; // Import the CommonJS module as a default
const { Pool } = pkg; // Destructure Pool from the default import

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: '5434',
  database: 'postgres',
});

export const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    //console.log(result) //this logs everything in the terminal that is happening when we query
    console.log(result.rows[0].admin)
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};
