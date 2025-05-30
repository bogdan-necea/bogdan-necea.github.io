function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let direction="ArrowRight";

//initialize the game grid ■ □
const WIDTH = 16,HEIGHT = 16, SPEED=150;
let gameGrid = [];

for(let i=0;i<HEIGHT;i++){
    gameGrid[i] = [];
    for(let j=0;j<WIDTH;j++){
        gameGrid[i][j]='□';
    }
}
let fruit;
function  spawnFood(){
    fruit = {
        x:random(1,HEIGHT-1),
        y:random(1,WIDTH-1)
    }
    console.log(fruit.x,fruit.y);
}

spawnFood();

function clearGrid(){
    for(let i=0;i<HEIGHT+2;i++){
        gameGrid[i] = [];
        for(let j=0;j<WIDTH+2;j++){
            gameGrid[i][j]='□';
        }
    }
    gameGrid[fruit.y][fruit.x]='<red>■</red>';
}

let snake = [], length=3;
snake [0] = {x:8,y:8};
snake [1] = {x:7,y:8};
snake [2] = {x:7,y:6};

function drawSnake(){
    gameGrid[snake[0].y][snake[0].x]='<green>■</green>';
    for(let i=1;i<length;i++){
        gameGrid[snake[i].y][snake[i].x]='<lime>■</lime>';
    }
    gameGrid[snake[0].y][snake[0].x]='<green>■</green>';
}

document.addEventListener("keydown", function(event){
    if(event.key=="ArrowUp" && direction!="ArrowDown") direction=event.key;
    else if(event.key=="ArrowDown" && direction!="ArrowUp") direction=event.key;
    else if(event.key=="ArrowLeft" && direction!="ArrowRight") direction=event.key;
    else if(event.key=="ArrowRight" && direction!="ArrowLeft") direction=event.key;
});

setInterval(function snakeMovement(){
    clearGrid();
    for(let i=length-1;i>0;i--){
        snake[i].x=snake[i-1].x;
        snake[i].y=snake[i-1].y;
    }

    switch (direction) {
        case "ArrowUp":
            snake[0].y--;
            break;
        
        case "ArrowDown":
            snake[0].y++;
            break;
        
        case "ArrowLeft":
            snake[0].x--;
            break;
        
        case "ArrowRight":
            snake[0].x++;
            break;
    }

    switch(snake[0].x){
        case 0:
            snake[0].x=WIDTH;
            break;
        case WIDTH+1:
            snake[0].x=1;
            break;
    }

    switch(snake[0].y){
        case 0:
            snake[0].y=WIDTH;
            break;
        case WIDTH+1:
            snake[0].y=1;
            break;
    }

    if(snake[0].x==fruit.x && snake[0].y==fruit.y){
            console.log("ate");
            spawnFood();
            length++;
            snake[length-1]={
                x:snake[length-2],
                y:snake[length-2]
            }
    }

    drawSnake();
},SPEED)



setInterval(function updateScreen(){
    let display = document.querySelector('.game-grid');
    display.innerHTML = gameGrid.map(row => row.join('')).join('<br>');
},SPEED)

