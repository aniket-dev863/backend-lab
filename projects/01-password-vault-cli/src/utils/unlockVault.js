const vaultService = require("../services/vaultService");
const repository = require("../database/masterRepository");
const { ask } = require("./prompt");

async function unlockVault() {
  const config = repository.loadMasterConfig();

  if (!config) {
    console.log("Vault has not been initialized.");

    console.log("Run: node src/index.js setup");

    process.exit(0);
  }

  const masterPassword = await ask("Master Password: ");

  vaultService.unlockVault(masterPassword);
}

module.exports = unlockVault;
