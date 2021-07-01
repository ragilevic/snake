const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
let score = 0;
const cellSize = 35;
let food = {
    x: Math.floor((Math.random() * 19 + 1)) * cellSize,
    y: Math.floor((Math.random() * 19 + 1)) * cellSize,
};
let snake = [];
snake[0] = {
    x: 10 * cellSize,
    y: 10 * cellSize
};

let direction = "up";


function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
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
            x: Math.floor((Math.random() * 19 + 1)) * cellSize,
            y: Math.floor((Math.random() * 19 + 1)) * cellSize
        };
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
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, cellSize, cellSize);
}

function drawSnake() {

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'blue';
        context.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
    }

}

function keyDownHandler(e) {

    if (e.keyCode == 37 && direction != "right")
        direction = "left";
    else if (e.keyCode == 38 && direction != "down")
        direction = "up";
    else if (e.keyCode == 39 && direction != "left")
        direction = "right";
    else if (e.keyCode == 40 && direction != "up")
        direction = "down";
}
document.addEventListener("keydown", keyDownHandler);
let game = setInterval(drawGame, 150);