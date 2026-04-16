import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';
import { initializeSchema } from './schema';

dotenv.config();

const DB_PATH = process.env.DATABASE_PATH || './travelvista.db';
const absolutePath = path.resolve(DB_PATH);

const db = new Database(absolutePath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize schema
initializeSchema(db);

export default db;
