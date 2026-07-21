const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");
const unlockVault = require("../utils/unlockVault");

async function show() {
  try {
    await unlockVault();
    const website = await ask("Website: ");
    const credential = vaultService.getCredentials(website);
    console.log("\n================");
    console.log("Website: ", credential.website);
    console.log("Username: ", credential.username);
    console.log("Password: ", credential.password);
    console.log("====================");
  } catch (error) {
    console.log(error.message);
  } finally {
    close();
  }
}

module.exports = show;
