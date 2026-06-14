import mysql from 'mysql2/promise';
import { config } from './config.js';

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
  supportBigNumbers: true,
});

export default pool;