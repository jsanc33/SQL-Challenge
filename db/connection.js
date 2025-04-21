import dotenv from 'dotenv';
dotenv.config();

// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export { pool, connectToDb };

/* Defaults ports:
  
    - PostgreSQL: 5432
    - MongoDB: 27017
    - Back End Server: 3001
    - Front End Server/Actual "Physical" page: 3000 (React, Angular, Vue.js, etc.)

  
    Note: Always check your database documentation for the correct port number.
*/

