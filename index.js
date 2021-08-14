/** @format */

/**
 * @license
 * All code within this repository, including this file is licensed under the
 * GNU GENERAL PUBLIC LICENSE
 * Version 3, 29 June 2007
 */

/** Dependencies */

const { default: jsPDF } = require("jspdf");
const prompts = require("prompts");
const chalk = require("chalk");
const pause = require("node-pause");

const updater = require("./libs/updater");
const al = require("./database/al");
const problemGen = require("./database/ps");
const pkg = require("./package.json");
const { error } = require("./libs/local/logger");
const pMsg = chalk`{green √} {bold Press any key to continue}`;
let questionsPerSheet = 50;
const { rnd } = require("./libs/local/tools");

/** Need to get rid of callback hell */
/** Check for update */
updater(
  {
    name: pkg.name,
    currentVersion: pkg.version,
    user: "CoolJim",
    branch: "main",
  },
  async (err, latestVersion, defualtMessage) => {
    /** Make sure to filter if returned is null (returns null primitive object???) */
    if (defualtMessage !== null) console.log(defualtMessage);

    /** Start program after it checks for updates. */
    const questions = [
      {
        type: "select",
        name: "type",
        hint: "Use arrow keys to move up and down. Press ENTER to submit.",
        message: chalk`Select a type of worksheet to generate.`,
        choices: [
          { title: "Addition", value: "+", description: "Addition questions" },
          {
            title: "Subtraction",
            value: "-",
            description: "Subtraction questions",
          },
          {
            title: "Multiplication",
            value: "*",
            description: "Multiplication questions",
          },
          { title: "Division", value: "/", description: "Division questions" },
          {
            title: "Problem Solving",
            description:
              "Problem solving questions are worded maths questions instead of direct questions",
            value: "p",
          },
          {
            title: "Algebra",
            description: "Experimental algebra questions. Figure out the x",
            value: "a",
          },
        ],
      },
      {
        type: (prev) => (prev == "p" ? null : "list"),
        name: "range",
        message: chalk`This program generates questions with random numbers from a range. Select the range. {gray (seperate with comma)}`,
      },
      {
        type: (prev) => (prev == "p" ? null : "number"),
        name: "questionsPerSheet",
        message: chalk`Amount of questions to generate {gray Max. 65, Min. 1}`,
        validate: (ans) =>
          ans < 1 || ans > 65 ? chalk`Maximum is 65, minimum is 1` : true,
      },
    ];
    const res = await prompts(questions);
    questionsPerSheet = res.questionsPerSheet;
    if (res.range) {
      app(res.type, parseInt(res.range[0]) || 1, parseInt(res.range[1]) || 0);
    } else app(res.type, 1, 10);
  }
);

function app(type, h, l) {
  /** Environment Variables */
  let humantype;
  if (type == "a") humantype = "Algebra";
  if (type == "+") humantype = "Addition";
  if (type == "*") humantype = "Multiplication";
  if (type == "/") humantype = "Division";
  if (type == "-") humantype = "Subtraction";
  if (type == "p") humantype = "Problem Solving";

  /** Generate Questions */
  let questions = [];
  if (type == "+") {
    for (let index = 0; index < questionsPerSheet; index++) {
      let first = rnd(l, h);
      let last = rnd(l, h);
      let answer = first + last;
      questions.push({
        q: `${first} + ${last}=`,
        a: answer,
      });
    }
  } else if (type == "-") {
    for (let i = 0; i < questionsPerSheet; i++) {
      let first = rnd(l, h);
      let last = rnd(l, h);
      /** Prevent negative answers */
      while (first < last) {
        first = rnd(l, h);
        last = rnd(l, h);
      }
      let answer = first - last;
      questions.push({
        q: `${first} - ${last}=`,
        a: answer,
      });
    }
  } else if (type === "*") {
    for (let i = 0; i < questionsPerSheet; i++) {
      let first = rnd(l, h);
      let last = rnd(l, h);
      let answer = first * last;
      questions.push({
        q: `${first}×${last}=`,
        a: answer,
      });
    }
  } else if (type === "/") {
    for (let i = 0; i < questionsPerSheet; i++) {
      let first = rnd(l, h);
      let last = rnd(l, h);
      while (
        first < last ||
        (first / last) % 1 != 0 ||
        first / last == 1 ||
        last == 1
      ) {
        first = rnd(l, h);
        last = rnd(l, h);
      }
      let answer = first / last;
      questions.push({
        q: `${first}÷${last}=`,
        a: answer,
      });
    }
  } else if (type == "p") {
    questions = problemGen();
  } else if (type == "a") {
    questions = al(questionsPerSheet, [l, h]);
  }
  if (typeof humantype == "undefined") {
    error(
      chalk`Worksheet type {magenta ${type}} is not supported! Supported types are {magenta + - / * p}`
    );
    return;
  }


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

  if (type !== "p") {
    let top = 3;
    let n = 0;
    for (let index = 0; index < questions.length; index++) {
      const e = questions[index];

      if (n % 5 == 0) {
        top += 2;
        n = 0;
      }
      doc.text(`Q${index + 1}. ${e.q}`, n * 4 + 1, top);
      n++;
    }
  } else {
    for (let n = 0; n < questions.length; n++) {
      const e = questions[n];
      doc.text(`Q${n + 1}. ${e.q}`, 1, n + 3);
    }
  }
  doc.addPage({ orientation: "p", unit: "cm" });
  doc.text("ANSWERS", 1, 2);

  if (type !== "p") {
    let x = 0;
    let fromTop = 4;
    for (let i = 0; i < questions.length; i++) {
      if (x % 5 == 0) {
        fromTop += 2;
        x = 0;
      }
      const element = questions[i];

      doc.text(`A${i + 1}. ${element.a}`, x * 4 + 1, fromTop);
      x++;
    }
  } else {
    for (let i = 0; i < questions.length; i++) {
      const e = questions[i];
      doc.text(`A${i + 1}. ${e.a}`, 1, i + 3);
    }
  }
  doc.save("worksheet.pdf");
  console.log(
    chalk`{green √} Successfully generated {magenta ${humantype}} worksheet! Check the folder this program is in for a PDF`
  );
  return pause(pMsg);
}
