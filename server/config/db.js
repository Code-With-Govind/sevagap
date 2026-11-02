// MySQL Connection Pool & State Manager
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'sevagap_db',
} = process.env;

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  // Test pool connectivity
  pool.getConnection()
    .then((conn) => {
      isConnected = true;
      conn.release();
      console.log(`[SevaGap DB] Successfully connected to MySQL pool on ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    })
    .catch((err) => {
      isConnected = false;
      console.warn(`[SevaGap DB Notice] MySQL pool connection failed (${err.message}). Server operating in resilient fallback mode.`);
    });
} catch (err) {
  isConnected = false;
  console.warn(`[SevaGap DB Notice] Pool initialization deferred: ${err.message}`);
}

export const db = {
  get pool() {
    return pool;
  },
  get isConnected() {
    return isConnected;
  },
  async query(sql, params) {
    if (!isConnected || !pool) {
      throw new Error('DATABASE_OFFLINE');
    }
    const [rows, fields] = await pool.query(sql, params);
    return [rows, fields];
  },
};

export default db;
