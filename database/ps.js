/** @format */

"use strict";
/** Problem solving worksheet handler/generator */
/**
 * This file handles math problem generation and handles other math-y stuff.
 */



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
  "Annabel",
  "Noel",
  "Harry",
  "Issac",
  "Sasha",
  "Dominic",
  "Bella",
  "Simon",
  "Mary",
  "Max",
  "Garry",
  "Gavin",
  "Serry",
  "Tommy",
  "Tom",
  "Noah",
  "Brad",
  "Nick",
  "Ted",
  "Oscar",
  "Willy",
  "Jackie"
];
const objects = [
  "pencils",
  "pens",
  "scissors",
  "cups",
  "caps",
  "phones",
  "dollars",
  "apples",
  "oranges",
  "candies",
  "bananas",
  "chips",
  "pineapples",
  "fruits"
];
module.exports = () => {
  const questions = [];
  for (let i = 0; i < 25; i++) {
    const rand = rnd(1, 4);
    if (rand === 1) {
      // +
      let person1 = characters[rnd(0, characters.length - 1)];
      let person2 = characters[rnd(0, characters.length - 1)];
      while (person1 === person2) {
        person1 = characters[rnd(0, characters.length - 1)];
        person2 = characters[rnd(0, characters.length - 1)];
      }
      const object = objects[rnd(0, objects.length - 1)];
      const first = rnd(2, 20);
      const last = rnd(2, 20);
      const answer = first + last;
      questions.push({
        q: `${person2} has ${first} ${object}. ${person1} gave ${person2} ${last} ${object}. How many ${object} does ${person2} have now?`,
        a: answer,
      });
    } else if (rand === 2) {
      // -
      let person1 = characters[rnd(0, characters.length - 1)];
      let person2 = characters[rnd(0, characters.length - 1)];
      while (person1 === person2) {
        person1 = characters[rnd(0, characters.length - 1)];
        person2 = characters[rnd(0, characters.length - 1)];
      }
      const object = objects[rnd(0, objects.length - 1)];
      let first = rnd(2, 20);
      let last = rnd(2, 20);
      while (first < last) {
        first = rnd(2, 20);
        last = rnd(2, 20);
      }
      const a = first - last;
      questions.push({
        q: `${person2} has ${first} ${object}. He gave ${last} to ${person1}. How many ${object} does ${person2} have now?`,
        a,
      });
    } else if (rand === 3) {
      // divide
      let person1 = characters[rnd(0, characters.length - 1)];
      let person2 = characters[rnd(0, characters.length - 1)];
      while (person1 === person2) {
        person1 = characters[rnd(0, characters.length - 1)];
        person2 = characters[rnd(0, characters.length - 1)];
      }
      const object = objects[rnd(0, objects.length - 1)];
      let first = rnd(2, 20);
      let last = rnd(2, 20);
      while (
        first < last ||
        (first / last) % 1 != 0 ||
        first / last == 1 ||
        last == 1
      ) {
        first = rnd(2, 20);
        last = rnd(2, 20);
      }
      const a = first / last;
      questions.push({
        a,
        q: `${person1} divided ${first} ${object} among ${last} people. How many does each person get?`,
      });
    } else if (rand === 4) {
      // *
      let person1 = characters[rnd(0, characters.length - 1)];
      let person2 = characters[rnd(0, characters.length - 1)];
      while (person1 === person2) {
        person1 = characters[rnd(0, characters.length - 1)];
        person2 = characters[rnd(0, characters.length - 1)];
      }
      const object = objects[rnd(0, objects.length - 1)];
      const first = rnd(2, 12);
      const last = rnd(2, 12);
      const a = first * last;
      questions.push({
        a,
        q: `${person1} had ${first} rows of ${object}. There are ${last} ${object} in each row. How many ${object} in total are there?`,
      });
    }
  }
  return questions;
};
