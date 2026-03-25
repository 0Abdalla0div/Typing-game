// array words
let words = {
  Easy: [
    "focus",
    "drive",
    "skill",
    "impact",
    "value",
    "time",
    "habit",
    "energy",
    "future",
    "growth",
    "belief",
    "system",
    "action",
    "effort",
    "vision",
  ],
  Normal: [
    "success",
    "freedom",
    "learning",
    "progress",
    "strength",
    "mindset",
    "balance",
    "patience",
    "passion",
    "clarity",
    "mastery",
    "clarity",
    "freedom",
    "practice",
    "mastery",
    "journey",
    "results",
    "ambition",
    "momentum",
    "courage",
    "strategy",
    "purpose",
  ],
  Hard: [
    "discipline",
    "challenge",
    "consistency",
    "confidence",
    "potential",
    "simplicity",
    "reflection",
    "execution",
    "opportunity",
    "direction",
    "determination",
    "adaptation",
    "improvement",
    "commitment",
    "resilience",
    "creativity",
  ],
};
// setting level
const lvls = {
  Easy: 4,
  Normal: 4,
  Hard: 5,
};
// level name and arr of words
let LevelName = "Normal";
let levelSeconds = lvls[LevelName];
let arrOfWords = [...words[LevelName]];
//  selectors
const input = document.querySelector(".input");
const startButton = document.querySelector(".start");
const lvlname = document.querySelector(".lvl");
const seconds = document.querySelector(".seconds");
const theWord = document.querySelector(".the-word");
const upcomingword = document.querySelector(".upcoming-words");
const timeLeft = document.querySelector(".time span");
const score = document.querySelector(".got");
const total = document.querySelector(".total");
const finishMassage = document.querySelector(".finish");
const diffbtn = document.querySelector(".changedef2");
const btns = document.querySelectorAll(".btn");

// DOM Info fill
function fillDom() {
  lvlname.textContent = LevelName;
  seconds.textContent = levelSeconds;
  total.textContent = arrOfWords.length;
  timeLeft.textContent = levelSeconds;
};
fillDom();
//DISABLE PASTE

input.onpaste = function () {
  return false;
};
//difficulty change
diffbtn.onclick = function () {
  if (LevelName === "Easy") {
    LevelName = "Normal";
  } else if (LevelName === "Normal") {
    LevelName = "Hard";
  } else {
    LevelName = "Easy";
  }
  levelSeconds = lvls[LevelName];
  arrOfWords = [...words[LevelName]];
  fillDom();
};
// start game

startButton.onclick = function () {
  btns.forEach((bt) => {bt.classList.add("remove")});
  input.focus();
  // genarate words
  genword();
  timeLeft.textContent = +timeLeft.textContent + 2;
};

// genarate words function

function genword() {
  // random word
  let randomword = arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
  // removing word from arr
  let worindex = arrOfWords.indexOf(randomword);
  arrOfWords.splice(worindex, 1);
  // upcoming words
  upcomingword.innerHTML = "";
  for (i = 0; i < arrOfWords.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(arrOfWords[i]);
    div.appendChild(txt);
    upcomingword.appendChild(div);
  }
  // show the word
  theWord.textContent = randomword;
  //start the game
  startplay();
}

function startplay() {
  timeLeft.textContent = levelSeconds;
  //start timer
  let start = setInterval(() => {
    timeLeft.textContent--;
    if (timeLeft.textContent === "0") {
      if (theWord.textContent.toLowerCase() === input.value.toLowerCase()) {
        score.textContent++;
        input.value = "";
        if (arrOfWords.length > 0) {
          genword();
        } else {
          upcomingword.remove();
          let span = document.createElement("span");
          span.className = "good";
          let spantxt = document.createTextNode("good job");
          span.appendChild(spantxt);
          finishMassage.appendChild(span);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spantxt = document.createTextNode("game over");
        span.appendChild(spantxt);
        finishMassage.appendChild(span);
      }
      clearInterval(start);
    }
  }, 1000);
}
