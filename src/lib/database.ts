import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { ViewedProduct } from '@/src/type/ViewedProduct'; // Assuming you have a type for viewed products

const dbPath = process.env.DATABASE_FILE_PATH || path.join(__dirname, '../data/database.db');

const dbPromise = open({
  filename: dbPath, // Replace with your actual database file path
  driver: sqlite3.Database,
});

export async function getViewedProducts(userId: string): Promise<ViewedProduct[]> {
  const db = await dbPromise;
  const viewedProducts = await db.all('SELECT * FROM viewed_products WHERE user_id = ?', userId);
  return viewedProducts as ViewedProduct[];
}

export async function addViewedProduct(userId: string, productId: number): Promise<void> {
  const db = await dbPromise;
  await db.run('INSERT INTO viewed_products (user_id, product_id) VALUES (?, ?)', userId, productId);
}
