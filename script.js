const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
let score = 0;
const cellSize = 16;


let snake = [];
snake[0] = {
    x: 10 * cellSize,
    y: 15 * cellSize
};
let arrSrcImg = [
    'img/cake_or.png',
    'img/cake_or2.png',
    'img/icecream.png',
    'img/icecream2.png',
    'img/icecream3.png'

]
let direction = "up";
let food = {
    x: getRandomFood(0, 19) * cellSize,
    y: getRandomFood(3, 29) * cellSize,
    src: Math.floor((Math.random() * 5))
}

function getRandomFood(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let img = new Image();



function drawGame() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width; i += 16) {
        for (let j = 32; j < canvas.height; j += 16) {
            context.fillStyle = '#595959';
            context.fillRect(i, j, cellSize - 1, cellSize - 1);

        }

    }
    drawFood();
    drawSnake();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction == "left") snakeX -= cellSize;
    if (direction == "right") snakeX += cellSize;
    if (direction == "up") snakeY -= cellSize;
    if (direction == "down") snakeY += cellSize;

    if (snake[0].x < 0 || snakeX > canvas.width - cellSize ||
        snake[0].y < 0 || snakeY > canvas.height - cellSize)
        clearInterval(game);
    if (snakeX == food.x && snakeY == food.y) {

        food = {
            x: getRandomFood(0, 19) * cellSize,
            y: getRandomFood(3, 29) * cellSize,
            src: Math.floor((Math.random() * 5))
        };
        img.src = arrSrcImg[food.src];
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    //eatTail(newHead, snake);
    snake.unshift(newHead);
    //context.closePath();
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
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
            context.fillStyle = '#F5A470';
        }
        context.fillRect(snake[i].x, snake[i].y, cellSize - 1, cellSize - 1);
    }

}

function keyDownHandler(e) {

    if (e.keyCode == 37 && direction != "right") {
        direction = "left";
    } else if (e.keyCode == 38 && direction != "down") {
        direction = "up";
    } else if (e.keyCode == 39 && direction != "left") {
        direction = "right";
    } else if (e.keyCode == 40 && direction != "up") {
        direction = "down";
    }

}
document.addEventListener("keydown", keyDownHandler);
let game = setInterval(drawGame, 200);