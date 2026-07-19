const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function updateCredentials() {
  try {
    let website = process.argv[3];
    if (!website) {
      website = await ask("Website : ");
    }
    const credential = vaultService.getCredentials(website);
    console.log("Website: ", credential.website);
    console.log("Username: ", credential.username);
    console.log("Password :**********");

    const confirmUser = await ask(
      "Update Credentials of Matched Website: [Y/N]",
    );
    if (confirmUser.trim().toLowerCase() === "y") {
      let newUserName = await ask(
        "New Username (Leave empty to keep current):",
      );
      if (!newUserName) newUserName = credential.username;

      let newPassword = await ask(
        "New Password (Leave empty to keep current):",
      );
      if (!newPassword) newPassword = credential.password;

      if (
        newUserName === credential.username &&
        newPassword === credential.password
      ) {
        console.log(`No Changes made `);
        return;
      }
      const result = vaultService.updateCredentials(
        website,
        newUserName,
        newPassword,
      );
      if (result.success === true) {
        console.log(`Credentials Updated Successfully . `);
      }
      return;
    } else {
      console.log(`Original Credentials Restored , Update Cancelled .`);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    close();
  }
}

module.exports = updateCredentials;
