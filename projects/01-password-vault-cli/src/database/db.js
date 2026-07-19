const Database = require("better-sqlite3");
const { DB_PATH } = require("../config/constants");
const db = new Database(DB_PATH);
db.exec(`
CREATE TABLE IF NOT EXISTS vault(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    website TEXT NOT NULL,

    username TEXT NOT NULL,

    password TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);
`);
module.exports = db;
