/** @format */

const fs = require("fs");
try {
  fs.readFileSync("settings.dat");
} catch {
  fs.writeFileSync("settings.dat", `{}`);
}
const file = fs.readFileSync("settings.dat");

module.exports.set = (key, value) => {
  let jsonFile = JSON.parse(file);
  jsonFile[key] = value;
  fs.writeFileSync("settings.dat", JSON.stringify(jsonFile));
};
module.exports.get = (key) => {
  const jsonFile = JSON.parse(file);
  for (const k in jsonFile) {
    if (Object.hasOwnProperty.call(jsonFile, key)) {
      return jsonFile[key];
    }
  }
};
module.exports.delete = (key) => {
  let jsonFile = JSON.parse(file);
  let exists;
  for (const k in jsonFile) {
    if (Object.hasOwnProperty.call(jsonFile, k)) {
      exists = true;
    }
  }
  if (exists !== true) throw new Error("Key does not exist!");
  delete jsonFile[key];
  fs.writeFileSync("settings.dat", JSON.stringify(jsonFile));
};
module.exports.reset = () => {};
