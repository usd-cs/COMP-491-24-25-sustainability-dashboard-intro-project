const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'kaelananderson',
  password: 'kaelan1',
  host: 'localhost',
  port: '5434',
  database: 'intro_proj_db',
});

(async () => {
  const plaintextPassword = 'kaelan_pword'; // Replace with the current plaintext password
  const hashedPassword = await bcrypt.hash(plaintextPassword, 10);

  await pool.query('UPDATE forum_schema."User" SET password = $1 WHERE username = $2', [
    hashedPassword,
    'kaelan',
  ]);
  console.log('Password updated successfully:', hashedPassword);
  pool.end();
})();
