const crypto = require("crypto");

const { SECRET_KEY, ALGORITHM } = require("../config/constants");

function decrypt(data) {
  const [ivHex, encrypted] = data.split(":");

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(ivHex, "hex"),
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");

  decrypted += decipher.final("utf8");

  return decrypted;
}

module.exports = decrypt;
