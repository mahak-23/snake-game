import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  snakeBodyIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board");

let isPaused = false;
let pauseButton = document.getElementById("pause-button");

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart.")) {
      //okay-true
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  if (!isPaused) {
    updateSnake();
  }
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || snakeBodyIntersection();
}

pauseButton.addEventListener("click", function () {
  if (isPaused) {
    // Resume the game
    isPaused = false;
    this.innerHTML = '<i class="fa fa-pause" style="font-size:24px"></i>'; 
    main(); // Restart the game loop
  } else {
    // Pause the game
    isPaused = true;
    this.innerHTML = '<i class="fa fa-play" style="font-size:24px"></i>'; 
  }
});
