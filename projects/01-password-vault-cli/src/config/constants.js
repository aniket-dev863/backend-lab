const path = require("path");
module.exports = {
  DB_PATH: path.join(__dirname, "../../data/vault.db"),
  SECRET_KEY: "12345678901234567890123456789012",
  ALGORITHM: "aes-256-cbc",
};
