import { getInputDirection } from "./input.js";

let speedSelector = document.getElementById("speed-selector");
export let SNAKE_SPEED = parseInt(localStorage.getItem("snakeSpeed")) || 3;

document
  .getElementById("speed-selector")
  .addEventListener("change", function () {
    SNAKE_SPEED = parseInt(this.value);
    localStorage.setItem("snakeSpeed", SNAKE_SPEED);
  });

// Set the selected attribute for the option with the current snake speed
Array.from(speedSelector.options).forEach((option) => {
  if (parseInt(option.value) === SNAKE_SPEED) {
    option.selected = true;
  }
});

document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    // Reload the page to restart the game
    window.location.reload();
  });

const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
  addSegments();

  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}

export function snakeBodyIntersection() {
  const snakeHead = getSnakeHead();
  return onSnake(snakeHead, { ignoreHead: true });
}
