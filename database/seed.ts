import fs from "fs";
import { Pool } from "pg";
import dotenv from "dotenv";
import { dbConnection } from "@database/.";

dotenv.config();

const pool = new Pool(dbConnection);

if (process.env.NODE_ENV !== "production") {
  const seedQuery = fs.readFileSync("database/seed.sql", { encoding: "utf8" });

  pool.query(seedQuery, (error) => {
    if (error) throw error;

    console.log("🌱 Database seeded");
    pool.end();
  });
}
