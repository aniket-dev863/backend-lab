const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const CONFIG_PATH = path.join(__dirname, "../../data/master-config.json");
function saveMasterConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 4));
}
function loadMasterConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}
module.exports = {
  saveMasterConfig,
  loadMasterConfig,
};
