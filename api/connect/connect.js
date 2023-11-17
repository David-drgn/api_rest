import pg from "pg";
const { Pool } = pg;

export function conectString() {
  return new Pool({
    connectionString:
      "postgres://default:7i1ASjyYdpzO@ep-mute-pond-02443459-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
  });
}
