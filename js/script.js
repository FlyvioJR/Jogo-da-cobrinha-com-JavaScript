let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 32;
let foodPosition = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let direction = "";
var snake = [];
snake[0] = {
    x: 8*box, 
    y: 8*box
};

function backGround(){
    context.fillStyle = "green";
    context.fillRect(0, 0, 16 * box, 16 * box);
};

function WalkingSnake(){
    for(i = 0; i < snake.length ; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    };
};

function Food (){
    context.fillStyle = "red"
    context.fillRect(foodPosition.x, foodPosition.y, box, box)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
};


function InitGame(){   
    
    if(snake[0].x > 14 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

    for (i=1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            clearInterval(game);
            alert("Game over");
        }
    }

    backGround();
    WalkingSnake();
    Food();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if (snakeX != foodPosition.x || snakeY != foodPosition.y) 
        snake.pop();
    else{
        foodPosition.x = Math.floor(Math.random() * 15 + 1) * box;
        foodPosition.y = Math.floor(Math.random() * 15 + 1) * box;
    };


    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

let game = setInterval(InitGame, 100);