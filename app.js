const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let AppleX = 5;
let AppleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3")
const failSound = new Audio("fail.mp3")

// Game Loop
const drawGame = () => {
    changeSnakePosition()

    let result = isGameOver()
    if (result) {
        return
    }

    clearScreen()

    checkAppleColison()
    drawApple()
    drawSnake()

    drawScore()

    if(score > 2) {
        speed = 11
    }
    if(score > 5) {
        speed = 25
    }

    setTimeout(drawGame, 1000 / speed)
}

const isGameOver = () => {
    let gameOver = false


    if (yVelocity === 0 && xVelocity === 0) {
        return false
    }


    if (headX < 0) {
        gameOver = true
        failSound.play()
    }
    else if (headX === tileCount) {
        gameOver = true
        failSound.play()
    }

    else if (headY < 0) {
        gameOver = true
        failSound.play()
    }
    else if (headY === tileCount) {
        gameOver = true
        failSound.play()
    }


    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (part.x === headX && part.y === headY) {
            gameOver = true
            failSound.play()
            break
        }
    }


    if (gameOver) {
        ctx.filStyle = "white"
        ctx.font = "50px Courier"

        ctx.fillText("Game Over", canvas.width / 6.6, canvas.height / 2)
    }

    return gameOver;
}

const clearScreen = () => {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawScore = () => {
    ctx.fillStyle = "green";
    ctx.font = '10px Verdana';
    ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

const drawSnake = () => {
    ctx.filStyle = '#000';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift()
    }
    ctx.fillStyle = '#FFF';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

const changeSnakePosition = () => {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

const drawApple = () => {
    ctx.fillStyle = 'purple';
    ctx.fillRect(AppleX * tileCount, AppleY * tileCount, tileSize, tileSize)

}

const checkAppleColison = () => {
    if (AppleX === headX && AppleY === headY) {
        AppleX = Math.floor(Math.random() * tileCount)
        AppleY = Math.floor(Math.random() * tileCount)
        tailLength++
        gulpSound.play()
        score++
    }
}

const keyDown = (event) => {
    // Up key
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0
    }

    // Down Key
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0
    }

    // Left Key
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1
    }
    // Right Key
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1
    }
}

document.body.addEventListener('keydown', keyDown)

drawGame()