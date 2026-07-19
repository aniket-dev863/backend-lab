const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function searchCredential() {
  try {
    let query = process.argv[3];
    if (!query) {
      let query = await ask("Enter website name to search : ");
    }
    const result = vaultService.searchCredential(query.trim().toLowerCase());
    if (result.length === 0) {
      console.log("No matching credentials found.");
      return;
    }
    console.log("Matching Credentials : ");
    for (const credential of result) {
      console.log(
        String(credential.id).padEnd(5),
        credential.website.padEnd(20),
        credential.username,
      );
    }
    console.log("Matched  Credentials = ", result.length);
  } catch (error) {
    console.log(error.message);
  } finally {
    close();
  }
}

module.exports = searchCredential;
