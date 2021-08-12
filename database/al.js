/**
 * File responsible for generating experimental algerbra questions
 *
 * @format
 */



const pronumerals = ["x", "y", "z", "a", "n", "b"];

module.exports = (amountOfQuestions, range) => {
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
function err(e) {
  console.log(chalk`{red X} Whoops! An error occured. Please refer to the message below for more information
  ${e}`);
  return pause(pMsg);
}
