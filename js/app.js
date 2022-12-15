// style board
// -----------------------------------
const boardBorder = '#000000';
const boardBg = '#FFFFFF';
const snakeColor = 'green';
const snakeBorder = '#005a9c';

// Make the snake : Use an array of coordinates to make the snake
// The snake will be 10 blocks long starting from the top left
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}

]

let score = 0;

// True if changing direction
let changingDirection = false;

// Snake x-coordinate
let dx = 10;

// Snake y-coordinate
let dy = 0;

// Canvas
// ----------------------------------------------------------
// Get the canvas element
const snakeBoard = document.getElementById('snakeBoard');
const snakeBoardCtx = snakeBoard.getContext('2d');

// Draw boarder around canvas
const clearCanvas = () => {
    //  Select the color to fill the drawing
    snakeBoardCtx.fillStyle = boardBg;
    //  Select the color for the border of the canvas
    snakeBoardCtx.strokestyle = boardBorder;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    // Draw a "border" around the entire canvas
    snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

// Snake

// Draw the snake on the canvas
const drawSnake = () => {
    // Draw each part
    snake.forEach(drawSnakePart)
    
}

// Draw one snake part
const drawSnakePart = (snakePart) => {
    // Set the color of the snake part
    snakeBoardCtx.fillStyle = snakeColor;
    // Set the border color of the snake part
    snakeBoardCtx.strokestyle = snakeBorder;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Move the snake
const moveSnake = () => {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    // Remove the last part of snake body
    snake.pop();
}

// Init
// ----------------------------------------------------------
const init = () => {
    // add timer
    setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawSnake();
        moveSnake();
        // Call game again(INIT)
        init();
    }, 200);// Run this function every 100ms
}

// Change direction
// ----------------------------------------------------------
const changeDirection = (e) => {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    // Prevent the snake from reversing
    if (changingDirection) return;
    changingDirection = true;

    // Get the key that was pressed
    const keyPressed = e.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    // Change direction
    if (keyPressed === LEFT && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN && !goingUp) {
        dx = 0;
        dy = 10;
    }

    const hasGameEnded = () => {
        for (let i = 4; i < snake.length; i++) {
            const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
            if (hasCollided) return true
        }
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > snakeBoard.width - 10;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > snakeBoard.height - 10;
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

    
}





// Call init to start the game
init();

document.addEventListener('keydown', changeDirection);
