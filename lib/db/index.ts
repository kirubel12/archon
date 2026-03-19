import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Ensure DATABASE_URL is set before calling neon()
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set. Drizzle ORM will fail to connect.");
}

const sql = neon(process.env.DATABASE_URL || "");
export const db = drizzle(sql);
