const run = require("./app");
const command = process.argv[2];
(async () => {
  console.log("=================================");
  console.log("Backend Lab - Password Vault");
  console.log("=================================\n");

  await run(command);
})();
