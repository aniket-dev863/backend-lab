const db = require("../database/db");
const repository = require("../database/vaultRepository");
const encrypt = require("../crypto/encrypt");
const decrypt = require("../crypto/decrypt");
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

function getCredentials(website) {
  const credential = repository.findByWebsite(website);
  if (!credential) {
    throw new Error("Website Credentials not Found \n");
  }

  return {
    website: credential.website,
    username: credential.username,
    password: decrypt(credential.password),
  };
}
function deleteCredential(website) {
  const credential = repository.findByWebsite(website);
  if (!credential) {
    throw new Error("Website not found ");
  }
  const result = repository.deleteCredentials(website);
  return result.changes > 0;
}

function getAllCredential() {
  return repository.getAllCredentials();
}
module.exports = {
  addCredentials,
  getCredentials,
  deleteCredential,
  getAllCredential,
};
