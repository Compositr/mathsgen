const chalk = require("chalk")
module.exports.error = (err) => {
  // Unified error handling
  console.log(chalk`{red ×} {bold An error occured. See the message below for more information}`);
  console.log(chalk`${err}`)
}