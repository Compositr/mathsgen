/**
 * File responsible for generating experimental algerbra questions
 *
 * @format
 */

const { evaluate, random, randomInt } = require("mathjs");

const pronumerals = ["x", "y", "z", "a", "n", "b"];

module.exports = (amountOfQuestions, range) => {
  let questions = [];
  for (let i = 0; i < amountOfQuestions; i++) {
    let x = randomInt(1, 10);
    let multiplier = randomInt(1, 10);
    let amount = randomInt(1, 10)
    let firstA = (x * multiplier - amount);
    questions.push({
      q: `${multiplier}x - ${amount} = ${firstA}`,
      a: x
    })
  }
  return questions;
};
