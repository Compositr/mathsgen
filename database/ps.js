/** @format */

"use strict";
/** Problem solving worksheet handler/generator */
/**
 * This file handles math problem generation and handles other math-y stuff.
 */

/**
 * @class
 * Mathamatical Expression object class
 */
class Expression {
  /**
   * Generate a new Expression
   * @param {String} expr An expression
   * @param {Number} answer Answer to the expression
   * @param {Number} first First number
   * @param {Number} last Last number
   * @param {String} type Type of question
   */
  constructor(expr, answer, first, last, type) {
    this.expr = expr;
    this.answer = answer;
    this.first = first;
    this.last = last;
    this.type = type;
  }
  evalutate() {
    return eval(expr);
  }
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function err(e) {
  return console.log(chalk`
  {red Whoops! An error occured. Please refer to the message below for more information}
  ${e}
  `);
}

const characters = [
  "Billy",
  "Noel",
  "Harry",
  "Issac",
  "Sasha",
  "Dominic",
  "Bella",
  "Simon",
];
const objects = [
  "pencils",
  "pens",
  "scissors",
  "cups",
  "pieces of paper",
  "x",
  "y",
  "apples",
  "oranges",
  "bananas",
];
module.exports = () => {
  const questions = [];
  const person1 = characters[rnd(0, characters.length - 1)];
  const person2 = characters[rnd(0, characters.length - 1)];
  const object = objects[rnd(0, objects.length - 1)];
  const first = rnd(2, 20);
  const last = rnd(2, 20);
  const answer = first + last;
  questions.push({
    q: `${person2} has ${first} ${object}. ${person1} gave ${person2} ${last} ${object}. How many ${object} does ${person2} have now?`,
    a: answer
  });
  return questions;
};
