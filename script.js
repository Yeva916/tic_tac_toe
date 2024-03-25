const clickMusic = new Audio("music/ting.mp3");
const overmusic = new Audio("music/gameover.mp3");
const winning = new Audio("music/winning.mp3");
let victory = false;
let over = false;
let filledboxes = 0;
let turn = "X";

//changing the turn
function changeTurn() {
  if (turn === "X") {
    return "O";
  } else {
    return "X";
  }
}

//winning
function winCheck() {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 15, 90],
    [0, 4, 8, 0, 15, 45],
    [2, 4, 6, 0, 15, 135],
  ];
  wins.forEach((element) => {
    if (
      boxtext[element[0]].innerHTML == boxtext[element[1]].innerHTML &&
      boxtext[element[0]].innerHTML == boxtext[element[2]].innerHTML &&
      boxtext[element[0]].innerHTML != ""
    ) {
      document.getElementsByClassName("info")[0].innerHTML =
        boxtext[element[0]].innerHTML + " won";
      document.querySelector("img").style.width = "200px";
      document.querySelector(".line").style.width = "30vw";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${element[3]}vw,${element[4]}vw) rotate(${element[5]}deg)`;
      winning.play();
      victory = true;
      turn = "";
    }
  });
}

//gameover
function gameover() {
  overmusic.play();
  over = true;
  filledboxes = 0;
}

let boxtext = document.getElementsByClassName("box");
Array.from(boxtext).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerHTML == "") {
      boxtext.innerHTML = turn;
      filledboxes++;
      clickMusic.play();
    }
    turn = changeTurn();
    winCheck();
    if (filledboxes == 9 && victory != true) {
      gameover();
    }
    if (!victory) {
      document.getElementsByClassName("info")[0].innerHTML = "turn for " + turn;
    }
    if (over) {
      document.getElementsByClassName("info")[0].innerHTML = "Click on=>";
    }
  });
});

//reset
document.getElementsByClassName("reset")[0].addEventListener("click", () => {
  document.querySelector(".line").style.width = "0";
  document.querySelector("img").style.width = "0";
  let boxtext = document.getElementsByClassName("boxtext");
  Array.from(boxtext).forEach((element) => {
    element.innerHTML = "";
  });
  turn = "X";
  document.getElementsByClassName("info")[0].innerHTML = "turn for " + turn;
  filledboxes = 0;
  over = false;
  victory = false;
});


// i am very happy that i finally abled to merge a pull request