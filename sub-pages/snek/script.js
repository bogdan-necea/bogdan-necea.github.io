function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let direction="ArrowRight";

//initialize the game grid ■ □
const WIDTH = 16,HEIGHT = 16;
let gameGrid = [], speed=150;

for(let i=0;i<HEIGHT+2;i++){
    gameGrid[i] = [];
    for(let j=0;j<WIDTH+2;j++){
        gameGrid[i][j]='□';
    }
}

let snake = [], length=3;
snake [0] = {x:8,y:8};
snake [1] = {x:7,y:8};
snake [2] = {x:7,y:6};

let fruit;

function spawnFood() {
    let valid = false;
    while (!valid) {
        fruit = {
            x: random(1, WIDTH),
            y: random(1, HEIGHT)
        };
        // Check if fruit is on the snake
        valid = true;
        for (let i = 0; i < length; i++) {
            if (snake[i].x === fruit.x && snake[i].y === fruit.y) {
                valid = false;
                break;
            }
        }
    }
    console.log(fruit.x, fruit.y);
}

spawnFood();

function clearGrid(){
    for(let i=0;i<HEIGHT+2;i++){
        gameGrid[i] = [];
        for(let j=0;j<WIDTH+2;j++){
            gameGrid[i][j]='□';
            if(i==0 || i==HEIGHT+1 || j==0 || j==WIDTH+1){
                gameGrid[i][j]='<gray>■</gray>';
            }
        }
    }
    gameGrid[fruit.y][fruit.x]='<red>■</red>';
}

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


function checkCollisionSelf(){
    for(let i=1;i<length;i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            return true;
        }
    }
    return false;
}

let isDead=false;
function gameOver(){
    if(isDead) return; // Prevent multiple game over triggers
    isDead=true;
    document.querySelector(".game-grid").style.display = "none";
    document.querySelector(".death-screen").style.display = "block";
    document.querySelector(".death-screen").innerHTML += "Press &lt;Enter&gt; to continue ▁<br>Score:"+ (length-3);
    document.addEventListener("keydown", function(event){
        if(event.key=="Enter"){
            this.location.reload();
        }
    })
}

setInterval(function snakeMovement(){
    clearGrid();
    if(checkCollisionSelf()){
        gameOver();
        return;
    }
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
            snake[0].y=HEIGHT;
            break;
        case HEIGHT+1:
            snake[0].y=1;
            break;
    }

    if(snake[0].x==fruit.x && snake[0].y==fruit.y){
            console.log("ate");
            speed = Math.round((-75/253)*length+ (150+75*3/253));
            console.log("Speed: " + speed);
            spawnFood();
            length++;
            snake[length-1]={
                x:snake[length-2].x,
                y:snake[length-2].y
            }
    }

    drawSnake();
},speed)

setInterval(function updateScreen(){
    let display = document.querySelector('.game-grid');
    display.innerHTML = gameGrid.map(row => row.join('')).join('<br>');
},speed)

