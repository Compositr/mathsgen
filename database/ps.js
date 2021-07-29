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
