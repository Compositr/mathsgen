/** @format */

const latest = require("./lib/latest-version.js");
const chalk = require("chalk");
const semver = require("semver");
const defaultMessage = function (options, latestVersion) {
  if (latestVersion == options.currentVersion) {
    return null;
  } else {
    return chalk`{cyan !} Update avaliable! {yellow ${options.currentVersion} => {green ${latestVersion}}}. Get it at {underline {blue https://github.com/CoolJim/mathsgen/releases}}`;
  }
  // } else {
  //   return chalk`{} Update avaliable!`
  //   // (
  //   //   "Update available: " +
  //   //   colors.green(options.latestVersion) +
  //   //   colors.dim(" (current: " + options.currentVersion + ")")
  //   // );
  // }
};
module.exports = function (options, cb) {
  latest(options, function (err, latestVersion) {
    if (err) {
      cb(err);
      return;
    } else if (options.currentVersion == undefined) {
      cb(null, latestVersion, null);
      return;
    } else {
      cb(null, latestVersion, defaultMessage(options, latestVersion));
      return;
    }
  });
};
