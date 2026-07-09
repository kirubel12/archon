import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Supabase Postgres connection for Drizzle (typed queries / migrations).
 * Prefer the Supabase JS clients in `lib/supabase/*` for most app reads/writes.
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "DATABASE_URL is not set. Drizzle will fail until you add your Supabase Postgres URL."
  );
}

const client = postgres(
  connectionString || "postgresql://postgres:postgres@localhost:5432/postgres",
  { prepare: false }
);

export const db = drizzle(client, { schema });
