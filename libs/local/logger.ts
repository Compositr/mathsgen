/** @format */

import chalk from "chalk";
export function error(err: string | Error) {
  // Unified error handling
  console.log(
    chalk`{red ×} {bold An error occured. See the message below for more information}`
  );
  console.log(chalk`{red ×} ${err}`);
}
