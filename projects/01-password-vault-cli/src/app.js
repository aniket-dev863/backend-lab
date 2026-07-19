const add = require("./commands/add");
const remove = require("./commands/delete");
const show = require("./commands/show");
const list = require("./commands/list");
const search = require("./commands/search");
const update = require("./commands/update");
const generate = require("./commands/generate");

const commands = {
  add,
  delete: remove,
  show,
  list,
  search,
  update,
  generate,
};

async function run(command) {
  const handler = commands[command];
  if (!handler) {
    console.log(`Unknown Command`);
    console.log(`Only add , delete , show , list  Commands Available`);
    process.exit(1);
  }
  await handler();
}

module.exports = run;
