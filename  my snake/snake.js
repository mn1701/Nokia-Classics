// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('space');
const logo = document.getElementById('logo');
const score = document.getElementById('score');

// Define game variables
const gridSize = 20;
let snake = [{ 
   x: 10,
   y: 10 
  }];
let food = randomFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameActive = false;

// Draw game map, snake, food
function draw() {
  // remove all nodes using innerHTML
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}


// NEW 
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.className = 'snake';
    snakeElement.style.gridColumn = segment.x;
    snakeElement.style.gridRow = segment.y; 
    board.appendChild(snakeElement);

    // id("game-board").appendChild(snakeElement);
  });
}

// NEW 
function drawFood() {
  if (gameActive) {
    const foodElement = document.createElement('div');
    foodElement.className = 'food';
    foodElement.style.gridColumn = food.x;
    foodElement.style.gridRow = food.y; 
    // append the new foodElement as a child of the board
    board.appendChild(foodElement); 
  }
}

// new 
function randomFood() {
  const randVar = Math.random()* gridSize
  const x = Math.ceil(randVar);
  const y = Math.ceil(randVar);
  return { x, y };
} 

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  snake.unshift(head); // add new head
  
  // if snake eats food
  if (head.x === food.x && head.y === food.y) {
    food = randomFood();
    // clearInterval to stop the given timer 
    clearInterval(gameInterval); // stop interval from executing game loop
    gameInterval = setInterval(gameLoop, gameSpeedDelay);
  } else {
    snake.pop(); // remove tail if the snake did not eat food 
  }
}

// NEW 
// Start game function
function startGame() {
  gameActive = true; // Keep track of a running game
  board.innerHTML = "";
  // hide the logo and instruction text
  instructionText.style.display = 'none';
  // id("space").style.display = 'none';
  logo.style.display = 'none';
  // execute game loop after game speed delay
  gameInterval = setInterval(gameLoop, gameSpeedDelay);
}

// new
function gameLoop() {
  move();
  checkHit();
  draw();
}

// Keypress event listener
/*
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}
*/


// new
function handleKeyPress(event) {
  switch (event.key) {
    case ' ':
    case 'Space':
      if (!gameActive) {
        startGame();
      }
      break;
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
    default:
      // Handle other key presses if needed
      break;
  }
}

document.addEventListener('keydown', handleKeyPress);

// NEW
function checkHit() {
  // Get the coordinates of the snake's head
  const headX = snake[0].x;
  const headY = snake[0].y;

  // Check if the head is out of bounds
  const outOfBounds = headX < 1 || headX > gridSize || headY < 1 || headY > gridSize;

  // Check if the head hit body
  const hitBody = snake.slice(1).some(segment => headX === segment.x && headY === segment.y);

  // If there's a hit with the boundaries or the body, reset the game
  if (outOfBounds || hitBody) {
    alert("Game Over");
    resetGame();
  }
}


function resetGame() {
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = randomFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

// NEW
function updateScore() {
  score.textContent = '00' + (snake.length - 1);
}

function stopGame() {
  clearInterval(gameInterval);
  gameActive = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}


