const db = require("./db");

function findByWebsite(website) {
  const stmt = db.prepare(`
        SELECT * FROM vault
        WHERE website = ?
    `);

  return stmt.get(website);
}

function insertCredential(website, username, password) {
  const stmt = db.prepare(`
        INSERT INTO vault
        (website, username, password)
        VALUES (?, ?, ?)
    `);

  stmt.run(website, username, password);
}

module.exports = {
  findByWebsite,
  insertCredential,
};
