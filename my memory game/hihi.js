// define html elements 
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');

// define game variable
// position where the snake start
let snake = [{x: 10, y: 10}];

// draw game map, snake, food
function draw() {
  board.innerHTML = ''; // reset this board everytime draw
  drawSnake(); // call function drawSnake
}

// draw snake
function drawSnake() {
  snake.forEach((segment) => {
    // create every snake element with div and snake class 
    const snakeElement = createGameElement('div',
  'snake');
  setPosition(snakeElement, segment);
  });
}

// create a snake or food cube/div 
function createGameElement(tag, className) {
  // create a new constant element 
  const element = documment.createGameElement(tag);
  // create a div with a class name of snake 
  element.className = className; 
  return element;
}

// set the position of snake or food 
function setPosition(element, position) {
  element.style.gridColumn = position.x;
}