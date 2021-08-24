/** @format */

interface options {
  name: string,
  currentVersion: string
  user: string
  branch: string
}

import got from "got";
const url = "https://raw.githubusercontent.com/";
export default function latest(
  options: options,
  cb: (err: string | Error, latestVersion?: string) => void
) {
  if (typeof options.branch === "undefined") options.branch = "master";
  if (typeof options.name === "undefined") {
    cb(new Error("Please set a name."));
    return;
  }
  got(
    url +
      encodeURIComponent(options.user) +
      "/" +
      encodeURIComponent(options.name) +
      "/" +
      encodeURIComponent(options.branch) +
      "/package.json",
    (err?: any, data?: any) => {
      if (err === 404) {
        cb(
          new Error(
            "Package or version doesn't exist on GitHub. Perhaps it is private?"
          ),
          null
        );
        return;
      }
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, JSON.parse(data).version);
    }
  );
}
