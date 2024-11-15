import pkg from 'pg'; // Import the CommonJS module as a default
const { Pool } = pkg; // Destructure Pool from the default import

const pool = new Pool({
  user: 'kaelananderson',
  password: 'kaelan1',
  host: 'localhost',
  port: '5434',
  database: 'intro_proj_db',
});

export const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};
