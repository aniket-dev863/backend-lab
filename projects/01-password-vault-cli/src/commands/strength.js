const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function checkStrength() {
  try {
    let password = process.argv[3];
    if (!password) {
      password = await ask("Provide Password :");
    }
    if (password.length > 50) {
      console.log(`Password too Large in Length`);
      return;
    }
    const result = vaultService.checkStrength(password);
    console.log("Strength: ", result.stren);
    console.log("Score ", result.score, "/5");
    if (result.checks.uppercase) {
      console.log("✓ Has uppercase letters");
    } else {
      console.log("✗ No uppercase letters");
    }
    if (result.checks.lowercase) {
      console.log("✓ Has lowercase letters");
    } else {
      console.log("✗ No lowercase letters");
    }
    if (result.checks.digit) {
      console.log("✓ Has Numbers ");
    } else {
      console.log("✗ No Numbers ");
    }

    if (result.checks.len >= 12) {
      console.log("✓ At least 12 characters");
    } else {
      console.log("✗ Too short");
    }

    if (result.checks.special) {
      console.log("✓ Has special characters");
    } else {
      console.log("✗ No special characters");
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    close();
  }
}

module.exports = checkStrength;
