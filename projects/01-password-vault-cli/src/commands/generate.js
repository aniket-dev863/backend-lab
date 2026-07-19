const vaultService = require("../services/vaultService");
const { ask, close } = require("../utils/prompt");

async function generatePassword() {
  try {
    let length = process.argv[3];
    if (!length) {
      length = await ask("Length of Required Password : ");
    }
    const result = vaultService.generatePassword(Number(length));

    console.log(`Generated Password (${length} characters):`);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  } finally {
    close();
  }
}

module.exports = generatePassword;
