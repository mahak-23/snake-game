import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

highScoreElement.innerText = `High Score: ${highScore}`;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    score++;
    scoreElement.innerText = `Score: ${score}`;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("high-score", highScore);
      highScoreElement.innerText = `High Score: ${highScore}`;
    }
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
