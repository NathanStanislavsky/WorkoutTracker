import "dotenv/config";
import pg from "pg";

const connectionString: string = process.env.DATABASE_URL as string;

const pool = new pg.Pool({
  connectionString,
  ssl: true,
});

export { pool };
