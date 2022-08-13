let categorySelect = document.querySelector(".category span");
let category = document.querySelector(".category");
let lettersDiv = document.querySelector(".letters");
let letterSpaces = document.querySelector(".letters-gusess");
let mainContainer = document.querySelector(".container");
let char = "abcdefghijklmnopqrstuvwxyz";
let theDraw = document.querySelector(".the-draw");
let backFinish = document.querySelector(".background");
let arrChar = Array.from(char);
let winSound = new Audio("sounds/win.wav");
let loseSound = new Audio("sounds/error.mp3");
let loseTwo = new Audio("sounds/lose2.wav");
let correctSound = new Audio("sounds/right.wav");
arrChar.forEach((sp) => {
  let span = document.createElement("span");
  span.className = "letter-box";
  span.innerHTML = sp;
  lettersDiv.appendChild(span);
});

let words = {
  sports: [
    "Zamalek",
    "Messi",
    "Shika",
    "FootBall",
    "Ball",
    "Competitor",
    "Staduim",
    "Event",
    "Penalty",
    "Score",
    "Trophy",
    "Captain",
  ],
  movies: [
    "John Wick",
    "The Matrix",
    "Stranger Things",
    "Mr Robot",
    "The Punisher",
    "Who Am I",
    "Home Front",
    "Nobody",
    "Taken",
    "Iron Man",
    "Spider Man",
    "Cruella",
    "Finch",
    "Inception",
  ],
  programming: [
    "Javascript",
    "Python",
    "Code",
    "Editor",
    "PhP",
    "Html",
    "Css",
    "React",
    "Variable",
    "Object",
    "Array",
    "Syntax",
    "String",
  ],
};

let randomProp =
  Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];
categorySelect.innerHTML = randomProp;
let randomVal = words[randomProp];
let randomShow = randomVal[Math.floor(Math.random() * randomVal.length)];

let arrRandom = Array.from(randomShow.toLowerCase());
arrRandom.forEach((letter) => {
  let crSpan = document.createElement("span");
  if (letter == " ") {
    crSpan.className = "with-span";
  }
  letterSpaces.appendChild(crSpan);
});

let allSpans = letterSpaces.querySelectorAll("span");

let wrongCounter = 0;
document.onclick = function (e) {
  let gameStatus = false;

  if (e.target.classList.contains("letter-box")) {
    e.target.classList.add("clicked");
    let clickValue = e.target.innerHTML.toLowerCase();
    game(gameStatus, clickValue);
  }
};

let hintDiv = document.querySelector(".hint");
let hintBtn = document.createElement("h3");
hintBtn.innerHTML = "Hint";
hintDiv.appendChild(hintBtn);

function hintTest(random) {
  hintBtn.onclick = function () {
    hintShow(random);
    hintDiv.classList.remove("active");
  };
}

function hintShow(random) {
  arrRandom.forEach((ele, idx) => {
    if (ele == random) {
      allSpans.forEach((span, i) => {
        if (idx === i) {
          span.innerHTML = random;
        }
      });
    }
  });
  lettersDiv.querySelectorAll("span").forEach((span) => {
    if (span.innerHTML == random) {
      span.classList.add("clicked", "hint");
      checkWin();
    }
  });
}

function checkWin() {
  correctSound.play();
  let arr = [];
  allSpans.forEach((span) => {
    if (span.innerHTML != "") {
      arr.push(span.innerHTML);
    }
  });
  let withoutSpace = arrRandom.filter((x) => x != " ");
  if (arr.length == withoutSpace.length) {
    winGame();
  }
}

function endGame() {
  let crpragraph = document.createElement("p");
  crpragraph.innerHTML = `Game Over,The Word Is <span>[${randomShow}]</span>`;
  backFinish.classList.add("end-game");
  crpragraph.classList.add("end-game");
  mainContainer.appendChild(crpragraph);
  setTimeout(() => {
    location.reload();
  }, 3500);
}

function winGame() {
  let crpragraph = document.createElement("p");
  crpragraph.innerHTML = `Congrats You Win`;
  backFinish.classList.add("end-game");
  crpragraph.classList.add("end-game", "win");
  mainContainer.appendChild(crpragraph);
  winSound.play();
  setTimeout(() => {
    location.reload();
  }, 4500);
}
let keyCheck = [];
document.addEventListener("keypress", (e) => {
  if (arrChar.indexOf(e.key) !== -1) {
    if (keyCheck.indexOf(e.key) == -1) {
      keyCheck.push(e.key);
      lettersDiv.querySelectorAll("span").forEach((span) => {
        if (span.innerHTML == e.key) {
          span.classList.add("clicked");
        }
      });
      keyboardClick(e);
    }
  }
});

function game(gameStatus, click) {
  arrRandom.forEach((ele, idx) => {
    if (ele == click) {
      gameStatus = true;
      allSpans.forEach((span, i) => {
        if (idx === i) {
          span.innerHTML = click;
        }
      });
    }
  });

  if (!gameStatus) {
    wrongCounter++;
    theDraw.classList.add(`wrong-${wrongCounter}`);
    loseSound.play();
    if (wrongCounter == 8) {
      lettersDiv.classList.add("finished");
      endGame();
      loseTwo.play();
    } else if (wrongCounter == 7) {
      let arr = [];
      allSpans.forEach((span) => {
        if (span.innerHTML != "") {
          arr.push(span.innerHTML);
        }
      });
      let randomArr = [];
      let randomWithoutSpace = arrRandom.filter((x) => x != " ");
      randomWithoutSpace.filter((e) => {
        if (!arr.includes(e)) {
          randomArr.push(e);
        }
      });
      let getRandom = randomArr[Math.floor(Math.random() * randomArr.length)];
      if (arr.length + 1 < randomWithoutSpace.length) {
        hintDiv.classList.add("active");
        hintTest(getRandom);
      }
    }
  } else {
    checkWin();
  }
}

function keyboardClick(e) {
  let gameStatus = false;
  arrRandom.forEach((ele, idx) => {
    if (ele == e.key) {
      gameStatus = true;
      allSpans.forEach((span, i) => {
        if (idx === i) {
          span.innerHTML = e.key;
        }
      });
    }
  });

  if (!gameStatus) {
    wrongCounter++;
    theDraw.classList.add(`wrong-${wrongCounter}`);
    loseSound.play();
    if (wrongCounter == 8) {
      lettersDiv.classList.add("finished");
      endGame();
      loseTwo.play();
    } else if (wrongCounter == 7) {
      let arr = [];
      allSpans.forEach((span) => {
        if (span.innerHTML != "") {
          arr.push(span.innerHTML);
        }
      });
      let randomArr = [];
      let randomWithoutSpace = arrRandom.filter((x) => x != " ");
      randomWithoutSpace.filter((e) => {
        if (!arr.includes(e)) {
          randomArr.push(e);
        }
      });
      let getRandom = randomArr[Math.floor(Math.random() * randomArr.length)];
      if (arr.length + 1 < randomWithoutSpace.length) {
        hintDiv.classList.add("active");
        hintTest(getRandom);
      }
    }
  } else {
    checkWin();
  }
}
