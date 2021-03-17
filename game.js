const grid = $(".grid");
let snakeBody = [{ x: 11, y: 11 }];
let food = { x: 6, y: 7 };
let inputDirection = { x: 1, y: 0 };
let snakeGrowSize = 1;
let newParts = 0;
let score = 0;
let gameFinished = false;
let snakeHead = snakeBody[0];
let gameOn;
let speed;
document.getElementById("score").innerHTML = "Score: " + 0;

function drawSnake() {
  grid.html("");
  snakeBody.forEach((segment) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = segment.y;
    snakeEl.style.gridColumnStart = segment.x;
    snakeEl.classList.add("snake");
    grid.append(snakeEl);
  });
}

function drawFood() {
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  if (samePosition()) {
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    food.x = Math.floor(Math.random() * 20) + 1; // there`s no 0 x on the grid, have to make it >1 but <21 so +1 saves the day
    food.y = Math.floor(Math.random() * 20) + 1;
    growSnake();
  }
  foodEl.classList.add("food");
  grid.append(foodEl);
}

function updateSnake() {
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
  // grid.append(snakeBody);
}

function growSnake() {
  const newTale = { ...snakeBody[snakeBody.length - 1] };
  if (inputDirection.x === 1) {
    newTale.x--;
  } else if (inputDirection.x === -1) {
    newTale.x++;
  } else if (inputDirection.y === 1) {
    newTale.y--;
  } else if (inputDirection.y === -1) {
    newTale.y++;
  }
  newParts += 1;
  console.log("grow snake", { ...snakeBody[snakeBody.length - 1] });
  snakeBody.push(newTale);
  return snakeBody;
}

function samePosition() {
  return snakeHead.x === food.x && snakeHead.y === food.y;
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

function wallCollision() {
  return (
    snakeBody[0].x < 1 ||
    snakeBody[0].x > 21 ||
    snakeBody[0].y < 1 ||
    snakeBody[0].y > 21 //EXPANDS??????????
  );
}
// function snakeEatsItself() {
//   const snakeEl = document.createElement("div");
//   snakeEl.style.gridRowStart = segment.y;
//   snakeEl.style.gridColumnStart = segment.x;
//   snakeBody.filter(snakeEl => )
//   snakeBody.forEach((segment) => {

//     if (
//       segment.x === snakeHead.x || segment.y === snakeHead.y
//     )
// }

function snakeEatsItself() {
  let i = 1;
  while (i < snakeBody.length) {
    if (snakeBody[i].x === snakeHead.x && snakeBody[i].y === snakeHead.y) {
      console.log("returning true");
      return true;
    }
    i++;
  }
  return false;
}

function gameOver() {
  if (wallCollision() || snakeEatsItself()) {
    snakeBody = [{ x: 11, y: 11 }];
    alert("game over");
    clearInterval(gameOn);
    location.reload();
  }
}

$(".start").click(function () {
  if ($("#snakeSpeed").data("clicked")) {
    speed = 100;
  } else{
    speed = 200;
  }
  gameOn = setInterval(() => {
    // console.log(snakeBody);
    updateSnake();
    drawSnake();
    drawFood();
    gameOver();
  }, speed);
});

$("#snakeSpeed").click(function () {
  // console.log("works")
  $(this).data("clicked", true);
});
