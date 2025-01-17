import { pool } from "../db.server";

export async function load() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT version()");
    const { version } = rows[0];
    return {
      version,
    };
  } finally {
    client.release();
  }
}
