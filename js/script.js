'use strict'

const buttons = document.querySelectorAll('.ctrl_button');
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const cellSize = 16;

let interval;
let score = 0;
let direction = 'up';
let isPaused = false;

let snake = [];
snake[0] = {
    x: 10 * cellSize,
    y: 15 * cellSize
};

let img = new Image();
let arrSrcImg = [
    'img/cake_or.png',
    'img/cake_or2.png',
    'img/icecream.png',
    'img/icecream2.png',
    'img/icecream3.png'
];
let food = {
    x: getRandomFood(0, 19) * cellSize,
    y: getRandomFood(3, 29) * cellSize,
    src: Math.floor((Math.random() * arrSrcImg.length))
}

function drawGame() {
    if (!isPaused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        drawField();
        drawFood();
        drawSnake();
        drawScore();

        if (direction == "left") {
            snakeX -= cellSize;
        } else if (direction == "right") {
            snakeX += cellSize;
        } else if (direction == "up") {
            snakeY -= cellSize;
        } else if (direction == "down") {
            snakeY += cellSize;
        }
        isBumped(snakeX, snakeY);
        if (snakeX == food.x && snakeY == food.y) {
            food = {
                x: getRandomFood(0, 19) * cellSize,
                y: getRandomFood(3, 29) * cellSize,
                src: Math.floor((Math.random() * arrSrcImg.length))
            };
            img.src = arrSrcImg[food.src];
            score++;
        } else {
            snake.pop();
        }
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        eatTail(newHead, snake);
        snake.unshift(newHead);
    }
}

function drawField() {
    for (let i = 0; i < canvas.width; i += 16) {
        for (let j = 32; j < canvas.height; j += 16) {
            context.fillStyle = '#595959';
            context.fillRect(i, j, cellSize - 1, cellSize - 1);
        }
    }
}

function drawFood() {
    img.src = arrSrcImg[food.src];
    context.drawImage(img, food.x, food.y);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            context.fillStyle = '#C73E00';
        } else {
            context.fillStyle = 'white';
        }
        context.fillRect(snake[i].x, snake[i].y, cellSize - 1, cellSize - 1);
    }
}

function drawScore() {
    context.font = "25px Comic Sans MS";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(`Score: ${score}`, canvas.width / 2, 25);
}

function changeDirection(snakeX, snakeY) {
    let arr = [];
    if (direction == "left") {
        snakeX -= cellSize;
    } else if (direction == "right") {
        snakeX += cellSize;
    } else if (direction == "up") {
        snakeY -= cellSize;
    } else if (direction == "down") {
        snakeY += cellSize;
    }
    return arr[snakeX, snakeY]
}

function isBumped(snakeX, snakeY) {
    if (snake[0].x <= 0 || snakeX > canvas.width - cellSize ||
        snake[0].y < 48 || snakeY > canvas.height - cellSize) {
        endGame();
        clearInterval(interval);
    }
}

function isAte(snakeX, snakeY) {
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: getRandomFood(0, 19) * cellSize,
            y: getRandomFood(3, 29) * cellSize,
            src: Math.floor((Math.random() * arrSrcImg.length))
        };
        img.src = arrSrcImg[food.src];
        score++;
    } else {
        snake.pop();
    }
}

function endGame() {
    context.font = "35px Comic Sans MS";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(`Game over!`, canvas.width / 2, canvas.height / 2);
    clearInterval(interval);
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            endGame();
            clearInterval(interval);
        }

    }
}

function getRandomFood(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyHandler(e) {
    if (e.keyCode == 37 && direction != "right") {
        direction = "left";
    } else if (e.keyCode == 38 && direction != "down") {
        direction = "up";
    } else if (e.keyCode == 39 && direction != "left") {
        direction = "right";
    } else if (e.keyCode == 40 && direction != "up") {
        direction = "down";
    } else if (e.keyCode == 32 && isPaused == false) {
        isPaused = true;
    } else if (e.keyCode == 32 && isPaused == true) {
        isPaused = false;
    }
}

function pressPause() {
    if (isPaused == false) {
        isPaused = true;
    } else if (isPaused == true) {
        isPaused = false;
    }
}

function pressRestart(e) {
    document.location.reload();
    clearInterval(interval)
}
document.addEventListener("keydown", keyHandler);



buttons[1].addEventListener("mousedown", pressPause);


buttons[0].addEventListener("click", pressRestart);


if (isPaused == false) {
    interval = setInterval(drawGame, 200);
}