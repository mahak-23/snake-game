let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

//when on mobile
export function setInputDirection(newDirection) {
    inputDirection = newDirection;
}
  
document.getElementById('up-button').addEventListener('click', () => {
    if (lastInputDirection.y !== 0) return;
    setInputDirection({ x: 0, y: -1 });
  });
  
  document.getElementById('down-button').addEventListener('click', () => {
    if (lastInputDirection.y !== 0) return;
    setInputDirection({ x: 0, y: 1 });
  });
  
  document.getElementById('left-button').addEventListener('click', () => {
    if (lastInputDirection.x !== 0) return;
    setInputDirection({ x: -1, y: 0 });
  });
  
  document.getElementById('right-button').addEventListener('click', () => {
    if (lastInputDirection.x !== 0) return;
    setInputDirection({ x: 1, y: 0 });
  });