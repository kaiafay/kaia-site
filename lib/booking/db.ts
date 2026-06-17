import { neon } from "@neondatabase/serverless";

let sqlClient: ReturnType<typeof neon> | null = null;

export function getBookingSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for booking persistence.");
  }

  sqlClient ??= neon(process.env.DATABASE_URL);
  return sqlClient;
}
