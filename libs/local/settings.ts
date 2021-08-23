/** @format */
import fs from "fs"

try {
  fs.readFileSync("settings.dat");
} catch {
  fs.writeFileSync("settings.dat", `{}`);
}
const file = fs.readFileSync("settings.dat", {encoding: "utf-8"});

export function set(key: string, value: any) {
  let jsonFile = JSON.parse(file);
  jsonFile[key] = value;
  fs.writeFileSync("settings.dat", JSON.stringify(jsonFile));
};
export function get(key: string) {
  const jsonFile = JSON.parse(file);
  for (const k in jsonFile) {
    if (Object.hasOwnProperty.call(jsonFile, key)) {
      return jsonFile[key];
    }
  }
};
export function del(key: string){
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
