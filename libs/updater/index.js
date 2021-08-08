/** @format */

const latest = require("./lib/latest-version.js");
const chalk = require("chalk");

const defaultMessage = (options) => {
  if (options.currentVersion === options.latestVersion) return null;
  else {
    return chalk`{cyan !} An update is avaliable! {gray ({yellow ${options.currentVersion}} => {green ${options.latestVersion}})} Go to {underline {blue https://github.com/cooljim/mathsgen/releases}} to fetch the latest update`;
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
