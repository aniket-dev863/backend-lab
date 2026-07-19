const vaultService = require("../services/vaultService");

function listAll() {
  const result = vaultService.getAllCredential();
  if (result.length === 0) {
    console.log(`No Websites Found `);
    return;
  }
  console.log("\n===========================================");
  console.log("ID       Website           Username");
  for (let i = 0; i < result.length; i++) {
    console.log(
      String(result[i].id).padEnd(5),
      result[i].website.padEnd(20),
      result[i].username,
    );
  }
  console.log("Total Credentials = ", result.length);
}

module.exports = listAll;
