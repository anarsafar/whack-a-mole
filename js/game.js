const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let score = 0;
let timeUp = false;

const randomTime = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomHoles = (holes) => {
  const hole_id = Math.floor(Math.random() * holes.length);
  const hole = holes[hole_id];

  if (hole === lastHole) {
    return randomHoles(holes);
  }

  lastHole = hole;
  return hole;
};

const peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHoles(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
};

const startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();

  setTimeout(() => {
    return (timeUp = true);
  }, 10000);
};

function bonk(e) {
  console.log(e);

  if (!e.isTrusted) return; //dont cheat

  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
