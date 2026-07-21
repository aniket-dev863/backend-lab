const crypto = require("crypto");

const { getSessionKey } = require("../config/session");

const ALGORITHM = "aes-256-cbc";

function encrypt(text) {
  const key = getSessionKey();

  if (!key) throw new Error("Vault is locked.");

  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");

  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

module.exports = encrypt;
