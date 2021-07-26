/** @format */

/** Dependencies */

const fs = require("fs");
const { v4: uuid } = require("uuid");
const { default: jsPDF } = require("jspdf");
const prompt = require("prompt");

prompt.start();
prompt.message =
  "Select a type of worksheet and press enter. (Valid choices are +,-,/,*)";

prompt.get("type", (err, res) => {
  if (err) return err(err);
  app(res.type);
});

function app(type) {
  /** Environment Variables */
  let humantype;
  if (type == "+") humantype = "Addition";
  if (type == "*") humantype = "Multiplication";
  if (type == "/") humantype = "Division";
  if (type == "-") humantype = "Subtraction";

  /** Generate Questions */
  const questions = [];
  if (type == "+") {
    for (let index = 0; index < 20; index++) {
      let first = rnd(1, 20);
      let last = rnd(1, 20);
      let answer = first + last;
      questions.push({
        q: `${first} + ${last}`,
        a: answer,
      });
    }
  } else if (type == "-") {
    for (let i = 0; i < 25; i++) {
      let first = rnd(1, 20);
      let last = rnd(1, 20);
      /** Prevent negative answers */
      while (first < last) {
        first = rnd(1, 20);
        last = rnd(1, 20);
      }
      let answer = first - last;
      questions.push({
        q: `${first} - ${last}`,
        a: answer,
      });
    }
  } else if (type === "*") {
    for (let i = 0; i < 25; i++) {
      let first = rnd(1, 12);
      let last = rnd(1, 12);
      let answer = first * last;
      questions.push({
        q: `${first}×${last}`,
        a: answer,
      });
    }
  } else if (type === "/") {
    for (let i = 0; i < 25; i++) {
      let first = rnd(1, 12);
      let last = rnd(1, 12);
      while (
        first < last ||
        (first / last) % 1 != 0 ||
        first / last == 1 ||
        last == 1
      ) {
        first = rnd(1, 30);
        last = rnd(1, 30);
      }
      let answer = first / last;
      questions.push({
        q: `${first}÷${last}`,
        a: answer,
      });
    }
  }
  if (typeof humantype == "undefined")
    return console.log(
      "Please choose either +,-,* or /. Your choice of " + type + " was invalid"
    );
  /** Doc */
  const d = new Date();
  const genTime = new Intl.DateTimeFormat("en-AU", { month: "long" }).format(d);
  const doc = new jsPDF({
    orientation: "p",
    unit: "cm",
  });
  doc.setFont("Times");
  doc.setFontSize(24);
  doc.text(
    `${humantype} Worksheet (Generated ${d.getDate()}, ${genTime})`,
    1,
    2
  );
  doc.setFontSize(12);

  for (let index = 0; index < questions.length; index++) {
    const e = questions[index];
    doc.text(`Q${index + 1}. ${e.q}=`, 3, index + 3);
  }
  doc.addPage({ orientation: "p", unit: "cm" });
  doc.text("ANSWERS", 3, 3);
  for (let i = 0; i < questions.length; i++) {
    const element = questions[i];
    doc.text(`A${i + 1}. ${element.a}`, 3, i + 4);
  }
  doc.save("worksheet.pdf");
  console.log("Successfully generated worksheet");
}
function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function err(e) {
  throw e;
}
