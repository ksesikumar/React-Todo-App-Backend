const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo_app",
    password: "MgHector@7",
    port: 5432,
});

module.exports = pool;
