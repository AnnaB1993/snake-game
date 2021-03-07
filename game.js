const grid = $(".grid");
let snakeBody = [{ x: 11, y: 11 }];
let food = { x: 6, y: 7 };
let inputDirection = { x: 1, y: 0 };
let snakeGrowSize = 1;
let newParts = 0;
let score = 0;

document.getElementById("score").innerHTML = "Score: " + 0;

function drawSnake(grid) {
  grid.html("");
  snakeBody.forEach((segment) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = segment.y;
    snakeEl.style.gridColumnStart = segment.x;
    snakeEl.classList.add("snake");
    grid.append(snakeEl);
  });
}

function drawFood(grid) {
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  if (samePosition()) {
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    food.x = Math.floor(Math.random() * 21);
    food.y = Math.floor(Math.random() * 21);
    growSnake();
  }
  foodEl.classList.add("food");
  grid.append(foodEl);
}

function updateSnake(grid) {
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
  grid.append(snakeBody);
}
function growSnake() {
  newParts += 1;
  snakeBody.push(snakeBody[snakeBody.length - 1 + newParts]);
}

function samePosition() {
  return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      if (inputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (inputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (inputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (inputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
  console.log(inputDirection);
});

function wallCollision(position) {
  return (
    snakeBody[0].x < 1 ||
    snakeBody[0].x > 22 ||
    snakeBody[0].y < 0 ||
    snakeBody[0].y > 22
  );
}
function snakeEatsItself() {
  let snakeHead = snakeBody[0];
  for (let i = 1; i <= snakeBody.length; i++) {
    if (snakeBody[i].x === snakeHead.x || snakeBody[i].y === snakeHead.y) {
      return true;
    }
  }
}

function gameOverText(grid) {
  let gameOverText = document.createElement("div");
  gameOverText.text("Game over!!!");
  gameOverText.classList.add("gameOver");
  grid.append(gameOverText);
}

function gameOver() {
  if (wallCollision(snakeHead) || snakeEatsItself()) {
    stopGame();
    gameOverText();
  }
}
function stopGame() {
  clearInterval(gameOn);
  location.reload();
}

let gameOn = setInterval(() => {
  updateSnake(grid);
  drawSnake(grid);
  drawFood(grid);
}, 200);
