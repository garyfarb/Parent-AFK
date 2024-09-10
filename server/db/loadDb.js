import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeSQLFile = async (filePath) => {
  const sql = fs.readFileSync(filePath).toString();
  try {
    console.log(sql)
    await pool.query(sql);
    console.log(`Successfully executed ${filePath}`);
  } catch (err) {
    console.error(`Error executing ${filePath}:`, err);
  }
};

const loadDatabase = async () => {
  try {
    await executeSQLFile(path.join(__dirname, 'ddl.sql'));
    await executeSQLFile(path.join(__dirname, 'dml.sql'));
    console.log('Database setup complete');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    pool.end();
  }
};

loadDatabase();