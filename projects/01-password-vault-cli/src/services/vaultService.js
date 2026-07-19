const db = require("../database/db");
const repository = require("../database/vaultRepository");
const encrypt = require("../crypto/encrypt");
function addCredentials({ website, username, password }) {
  if (!website || !username || !password) {
    throw new Error("All feilds are required ");
  }
  const exists = repository.findByWebsite(website);
  if (exists) {
    return {
      success: false,
      reason: "DUPLICATE",
    };
  }
  const encryptedPassword = encrypt(password);
  repository.insertCredential(website, username, encryptedPassword);

  return { success: true };
}

module.exports = {
  addCredentials,
};
