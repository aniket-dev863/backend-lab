const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function deleteCredential() {
  try {
    const website = await ask("Website: ");
    const credential = vaultService.getCredentials(website);
    console.log("Website: ", credential.website);
    console.log("Username: ", credential.username);
    const confirmUser = await ask("Delete this credential? (Y/N):");
    if (confirmUser.trim().toLowerCase() === "y") {
      const res = vaultService.deleteCredential(website);
      if (res === true) {
        console.log(`${website} Credentials Deleted Successfully`);
      } else {
        console.log("Deletion Cancelled .");
      }
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    close();
  }
}

module.exports = deleteCredential;
