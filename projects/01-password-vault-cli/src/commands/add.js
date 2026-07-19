const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function add() {
  console.log("\n=== Add New Credential ===\n");

  const website = await ask("Website : ");
  const username = await ask("Username : ");
  const password = await ask("Password : ");

  try {
    const result = vaultService.addCredentials({
      website,
      username,
      password,
    });
    if (!result.success) {
      if (result.reason === "DUPLICATE") {
        const answer = await ask("Credentials Exists . Update [y/n] ");
        if (answer.toLowerCase() === "y") {
          // call update credentials .
        }
      }
    } else {
      console.log(` \n Credentials Saved `);
    }
  } catch (error) {
    console.log("\n", error.message);
  } finally {
    close();
  }
}

module.exports = add;
