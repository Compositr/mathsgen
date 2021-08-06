/** @format */

const latest = require("./lib/latest-version.js");
const chalk = require("chalk");
const semver = require("semver");
const defaultMessage = function (options) {
  if (options.latestVersion == options.currentVersion) {
    return null;
  } else if (
    semver.major(options.latestVersion) > semver.major(options.currentVersion)
  ) {
    return chalk`{red !} Major update avaliable ({yellow ${options.currentVersion}} ➔ {green ${options.latestVersion}})`;
  } else if (
    semver.minor(options.latestVersion) >
      semver.minor(options.currentVersion) &&
    semver.major(options.latestVersion) < semver.major(options.currentVersion)
  ) {
    return chalk`{yellow !} Feature update avaliable (${options.currentVersion} ➔ {green ${options.latestVersion}})`;
  } else if (
    semver.patch(options.latestVersion) >
      semver.patch(options.currentVersion) &&
    semver.minor(options.latestVersion) <
      semver.minor(options.currentVersion) &&
    semver.major(options.latestVersion) < semver.major(options.currentVersion)
  ) {
    return chalk`{cyan !} Patch update avaliable (${options.currentVersion} ➔ ${options.latestVersion})`;
  } else {
    return chalk`{cyan β} Experimental version detected! Please be careful...`;
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
