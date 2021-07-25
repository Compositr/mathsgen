/** @format */

/** Dependencies */

const fs = require("fs");
const { v4: uuid } = require("uuid");
const { default: jsPDF } = require("jspdf");

/** Environment Variables */
const type = process.env.GENERATE_TYPE || "+";
console.log(type);
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
}

/** Doc */
const d = new Date();
const genTime = new Intl.DateTimeFormat("en-AU", { month: "long" }).format(d);
const doc = new jsPDF({
  orientation: "p",
  unit: "cm",
});
doc.setFont("Times New Roman");
doc.setFontSize(24);
doc.text(`${humantype} Worksheet (Generated ${d.getDate()}, ${genTime})`, 1, 2);
doc.setFontSize(12);

for (let index = 0; index < questions.length; index++) {
  const e = questions[index];
  doc.text(`Q${index + 1}. ${e.q}=`, 3, index + 3);
}
doc.addPage({ orientation: "p", unit: "cm" });
doc.text("ANSWERS", 3, 3);
for (let i = 0; i < questions.length; i++) {
  const element = questions[i];
  doc.text(`A${i + 1}. ${element.a}=`, 3, i + 4);
}
doc.save("worksheet.pdf");
console.log(questions);

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
