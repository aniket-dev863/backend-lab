const db = require("../database/db");
const repository = require("../database/vaultRepository");
const encrypt = require("../crypto/encrypt");
const decrypt = require("../crypto/decrypt");
const crypto = require("crypto");

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

function searchCredential(query) {
  return repository.searchCredential(query);
}

function updateCredentials(website, username, password) {
  const encryptedPassword = encrypt(password);
  repository.updateCredentials(username, encryptedPassword, website);
  return {
    success: true,
  };
}

function generatePassword(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const randomBytes = crypto.randomBytes(length);
  let password = "";
  for (let nums of randomBytes) {
    password += chars[nums % chars.length];
  }
  if (password.length === length) return password;
  else {
    throw new Error("Not able to generate password ");
    return;
  }
}
function checkStrength(password) {
  let pnts = 0;
  String(password);
  if (password.length >= 12) pnts += 1;
  if (/[A-Z]/.test(password)) pnts += 1;
  if (/[a-z]/.test(password)) pnts += 1;
  if (/[0-9]/.test(password)) pnts += 1;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) pnts += 1;

  let strength;
  if (pnts <= 2) strength = "Weak";
  else if (pnts <= 4 && pnts >= 2) strength = "Medium";
  else strength = "Strong";

  return {
    score: pnts,
    stren: strength,

    checks: {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9-Z]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      len: password.length,
    },
  };
}
module.exports = {
  addCredentials,
  getCredentials,
  deleteCredential,
  getAllCredential,
  searchCredential,
  updateCredentials,
  generatePassword,
  checkStrength,
};
