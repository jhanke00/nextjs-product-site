import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPath = process.env.DATABASE_FILE_PATH || path.join(__dirname, '../data/database.db');

export async function setupDatabase() {
  try {
    const db = await open({
      filename: dbPath, // Replace with your actual path
      driver: sqlite3.Database,
    });

    await db.exec(`
            CREATE TABLE IF NOT EXISTS viewed_products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                product_id INTEGER NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up Database: ', error);
    process.exit(1);
  }
}

//setupDatabase(); // Call this function once at the beginning of your app
