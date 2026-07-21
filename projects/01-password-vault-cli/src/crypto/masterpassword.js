const crypto = require("crypto");

const ITERATIONS = 100000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
}

function createVerificationHash(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

module.exports = {
  generateSalt,
  deriveKey,
  createVerificationHash,
  ITERATIONS,
};
