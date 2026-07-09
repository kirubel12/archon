import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * App data lives in Supabase Postgres.
 * Auth is handled by Clerk — do not store passwords or sessions here.
 *
 * Example profile table (optional): link app data to a Clerk user id.
 * Uncomment / extend when you need user-owned records.
 */
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // Clerk user id
  email: text("email"),
  fullName: text("full_name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
