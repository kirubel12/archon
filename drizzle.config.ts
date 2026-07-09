import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Supabase → Project Settings → Database → Connection string (URI)
    // Prefer the "Transaction" pooler URL for serverless (port 6543)
    url: process.env.DATABASE_URL!,
  },
});
