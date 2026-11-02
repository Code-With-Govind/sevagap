// SevaGap Database Initializer & Migration Script
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'sevagap_db',
} = process.env;

export async function initializeDatabase() {
  console.log(`[SevaGap DB] Attempting connection to MySQL at ${DB_HOST}:${DB_PORT} as '${DB_USER}'...`);

  let connection;
  try {
    // Connect without database first to ensure database existence
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    console.log(`[SevaGap DB] Connected to MySQL Server successfully.`);

    // 1. Run Schema
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    console.log(`[SevaGap DB] Applying schema definitions from schema.sql...`);
    await connection.query(schemaSql);
    console.log(`[SevaGap DB] Schema applied. Database '${DB_NAME}' and tables created.`);

    // 2. Run Seed
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    console.log(`[SevaGap DB] Seeding initial development placeholder records...`);
    await connection.query(seedSql);
    console.log(`[SevaGap DB] Seed data inserted successfully with data_status = 'PLACEHOLDER'.`);

    // Verify counts
    await connection.changeUser({ database: DB_NAME });
    const [districts] = await connection.query('SELECT COUNT(*) as count FROM districts');
    const [edu] = await connection.query('SELECT COUNT(*) as count FROM education_data WHERE data_status = "PLACEHOLDER"');
    const [health] = await connection.query('SELECT COUNT(*) as count FROM healthcare_data WHERE data_status = "PLACEHOLDER"');
    const [water] = await connection.query('SELECT COUNT(*) as count FROM water_data WHERE data_status = "PLACEHOLDER"');

    console.log(`[SevaGap DB] Verification complete:`);
    console.log(` - Districts: ${districts[0].count}`);
    console.log(` - Education placeholder records: ${edu[0].count}`);
    console.log(` - Healthcare placeholder records: ${health[0].count}`);
    console.log(` - Water placeholder records: ${water[0].count}`);

    return true;
  } catch (error) {
    console.error(`[SevaGap DB Error] Failed to initialize database: ${error.message}`);
    console.error(`[SevaGap DB Notice] Please check your DB credentials in server/.env if needed.`);
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run directly when executed from command line
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initializeDatabase().then((success) => {
    process.exit(success ? 0 : 1);
  });
}
