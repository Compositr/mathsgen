/**
 * File responsible for generating experimental algerbra questions
 *
 * @format
 */

const pronumerals = ["x", "y", "z", "a", "n", "b"];
import { rnd } from "../libs/local/tools";
export default (amountOfQuestions: number, range?: any) => {
  let questions = [];
  for (let i = 0; i < amountOfQuestions; i++) {
    let x = rnd(1, 10);
    let multiplier = rnd(1, 10);
    let amount = rnd(1, 10);
    let firstA = x * multiplier - amount;
    questions.push({
      q: `${multiplier}x - ${amount} = ${firstA}`,
      a: x,
    });
  }
  return questions;
};
