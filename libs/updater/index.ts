/** @format */

import latest from "./lib/latest-version.js";
import chalk from "chalk";
import { compare } from "compare-versions";
export function defaultMessage(
  options: {
    name: string;
    currentVersion: string;
    user: string;
    branch: string;
  },
  latestVersion: string
) {
  const isOutdated = compare(options.currentVersion, latestVersion, "<");
  const isExperimental = compare(options.currentVersion, latestVersion, ">");
  if (latestVersion == options.currentVersion) {
    return null;
  } else if (isOutdated) {
    return chalk`{cyan !} Update avaliable! {yellow ${options.currentVersion}} => {green ${latestVersion}}. Get it at {underline {blue https://github.com/CoolJim/mathsgen/releases}}`;
  } else if (isExperimental) {
    return chalk`{cyan β} Experimental version detected. Please be careful`;
  }
}
export default function (
  options: {
    name: string;
    currentVersion: string;
    user: string;
    branch: string;
  },
  cb: (
    err: string | null | Error,
    latestVersion?: string,
    defaultMessage?: string
  ) => void
) {
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
}
