import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
  process.env.DATABASE_URL ??
    "postgresql://user:password@localhost:5432/atelier_store",
);

export const db = drizzle({ client: sql });
