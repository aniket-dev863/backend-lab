const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function setup() {
  try {
    const password = await ask("Create Master Password: ");

    const confirm = await ask("Confirm Master Password: ");

    if (password !== confirm) throw new Error("Passwords do not match.");

    vaultService.setupMasterPassword(password);

    console.log("Vault initialized successfully.");
  } catch (err) {
    console.log(err.message);
  } finally {
    close();
  }
}

module.exports = setup;
