const crypto = require("crypto");

const { getSessionKey } = require("../config/session");

const ALGORITHM = "aes-256-cbc";

function decrypt(cipherText) {
  const key = getSessionKey();

  if (!key) throw new Error("Vault is locked.");

  const parts = cipherText.split(":");

  const iv = Buffer.from(parts[0], "hex");

  const encrypted = parts[1];

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");

  decrypted += decipher.final("utf8");

  return decrypted;
}

module.exports = decrypt;
