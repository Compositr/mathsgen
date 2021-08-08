/** @format */

const latest = require("./lib/latest-version.js");
const chalk = require("chalk");
const latestVersion = require("./lib/latest-version.js");

const defaultMessage = (options) => {
  if(currentVersion === latestVersion) return null;
  else {
    return chalk`{cyan !} An update is avaliable! {gray {yellow ${currentVersion}} => {green ${latestVersion}}`
  }
};
module.exports = function (options, cb) {
  latest(options, function (err, latestVersion) {
    options.latestVersion = latestVersion;
    if (err) {
      cb(err);
      return;
    } else if (options.currentVersion == undefined) {
      cb(null, latestVersion, null);
      return;
    } else {
      cb(null, latestVersion, defaultMessage(options));
      return;
    }
  });
};
