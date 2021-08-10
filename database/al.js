/**
 * File responsible for generating experimental algerbra questions
 *
 * @format
 */

const { evaluate, random, randomInt } = require("mathjs");

const pronumerals = ["x", "y", "z", "a", "n", "b"];

module.exports = (amountOfQuestions, range) => {
  for (let i = 0; i < amountOfQuestions; i++) {
    let x = randomInt(range[0], range[1]);
    let multiplier = randomInt(2, 16);
    let x_multiplier = randomInt(2, 16)
    let pronumeral = pronumerals[randomInt(0, pronumerals.length - 1)];
    let question = `${x_multiplier}${pronumeral} + ${multiplier} = ${x_multiplier + (multiplier / x)}${pronumeral}`
    console.log(question)
  }
};
