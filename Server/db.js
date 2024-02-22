import pg from "pg";
import "dotenv/config";

const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER, //USER postgres
    host: process.env.DB_HOST, //local host
    database: "Project-Social clone",
    password: process.env.DB_PASS, //Password postgres 
    port: 5432,
});

export default pool;