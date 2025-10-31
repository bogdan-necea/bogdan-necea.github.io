document.addEventListener("DOMContentLoaded",()=>{
// Global Variables
let gridSize = 20 , minesNum = 120, pauseState = false;
let s=0, m=0, h=0;
// HTML Elements
const gameContainer = document.querySelector(".game-container") , title = document.querySelector(".window");

let buttons=document.querySelectorAll('#btn-replay');
Array.from(buttons).forEach((btn)=>{
    btn.onclick=()=>{
        location.reload();
    }
});

let btnPause=document.getElementById("btn-pause");
let btnPlay=document.getElementById("btn-play");

btnPause.addEventListener("click",()=>{
    pauseState= true;
    popup.pause.classList.remove("hidden");
    gameContainer.classList.add("hidden");
});

btnPlay.addEventListener("click",()=>{
    pauseState= false;
    popup.pause.classList.add("hidden");
    gameContainer.classList.remove("hidden");
});

let popup={
    win: document.getElementById("pop-win"),
    lose: document.getElementById("pop-lose"),
    pause: document.getElementById("pop-pause"),
    diff: document.getElementById("pop-diff")
};

// General Functions
function pad(number){
    return number < 10 ? `0${number}` : `${number}`;
}

function getRandom(){
    return Math.floor(Math.random() * gridSize);
}

function isValid(x,y){
    return (x>=0 && y>=0 && x<gridSize && y<gridSize);
}

function tile(x,y){
    return isValid(x,y) ? document.querySelectorAll(".cell")[x+gridSize*y] : null;
}

function isMine(x,y){
    return isValid(x,y) ? tile(x,y).classList.contains("mine") : false;
}

function isFlag(x,y){
    return isValid(x,y) ? tile(x,y).classList.contains("flag") : false;
}

function isClear(x,y){
    return isValid(x,y) ? tile(x,y).classList.contains("clear") : false;
}

// Game Functions
function updateTime(stop=pauseState){
    if(!stop){
        title.setAttribute("data-title",`</Minesweeper [${pad(h)}:${pad(m)}:${pad(s)}]  [${pad(minesNum)}×⬤]>`);
        s++;
        if(s===60){ m++; s=0;}
        if(m===60){ h++; m=0;}
    }
}

function countMines(x,y){
    let count=0;
    for(let dy=y-1;dy<=y+1;dy++)
        for(let dx=x-1;dx<=x+1;dx++)
            if(isMine(dx,dy)) count++;
        
    return count;
}

let firstClick=true;
function addListeners(){
    for(let y=0;y<gridSize;y++){
        for(let x=0;x<gridSize;x++){
            tile(x,y).addEventListener("click",function lclick(){
                if(firstClick){
                    setInterval(updateTime,1000); // Start timer, update every second
                    generateMines(x,y); 
                    clearArea(x,y);
                    firstClick=false;
                }
                if(isFlag(x,y)) tile(x,y).classList.remove("flag");
                else if(!isMine(x,y)) clearArea(x,y);
                else losePopup();
                
                if(checkWin()) winPopup();
            });
            tile(x,y).addEventListener("contextmenu",function rclick(event){
                event.preventDefault();
                if(!isClear(x,y)) tile(x,y).classList.toggle("flag");
                if(checkWin()) winPopup();
            })
            
        }
    }
}

function checkWin(){
    let  clear=0, flagged=0;
    for(let y=0;y<gridSize;y++){
        for(let x=0;x<gridSize;x++){
            if(isClear(x,y)) clear++;
            if(isMine(x,y) && isFlag(x,y)) flagged++;
        }
    }
    return ((minesNum+clear===gridSize*gridSize) || flagged===minesNum);
}

function winPopup(){ // Open popup on win
    pauseState=true;
    popup.win.setAttribute("data-title",`</You win! [${pad(h)}:${pad(m)}:${pad(s)}] >`);
    popup.win.classList.remove("hidden");
    gameContainer.classList.add("hidden");
}

function losePopup(){ // Open popup on lose
    pauseState=true;
    popup.lose.setAttribute("data-title",`</You lose! [${pad(h)}:${pad(m)}:${pad(s)}] >`);
    popup.lose.classList.remove("hidden");
    gameContainer.classList.add("hidden");
}

function clearArea(x,y){ // Clear non-mine area recursively
    if(!isValid(x,y)) return;
    tile(x,y).style.backgroundColor= ((x+y)%2) ? "hsl(45, 90%, 75%)" : "hsl(45, 75%, 60%)";
    if(tile(x,y).innerHTML==="" && !isClear(x,y)){
        tile(x,y).classList.add("clear");
        for(let dy=y-1;dy<=y+1;dy++){
            for(let dx=x-1;dx<=x+1;dx++){
                clearArea(dx,dy);
            }
        }
    }
    else if(!isMine(x,y)){
        tile(x,y).classList.add("clear");
    }
}

function generateMines(fX,fY){ // Place mines randomly, avoiding already placed mines and radius around first click
    for(let i=0;i<minesNum;i++){
        let x=getRandom(), y=getRandom();
        if(isMine(x,y)|| Math.floor((fX-x)**2+(fY-y)**2)<9) i--;
        else{
            tile(x,y).classList.add("mine");
            tile(x,y).style.backgroundColor="red";
        }
    }
    generateNumbers();
}

function generateNumbers(){ // Set values on tiles based on nearby mines
    for(let y=0;y<gridSize;y++){
        for(let x=0;x<gridSize;x++){
            if(!isMine(x,y)) countMines(x,y);
            tile(x,y).innerHTML = countMines(x,y)>0 ? countMines(x,y) : "";
        }
    }
}

function createGrid(){ // Create grid cells as div elments
    for(let y=0;y<gridSize;y++){
        for(let x=0;x<gridSize;x++){
            let newTile=document.createElement("div");
            newTile.classList.add("cell");
            newTile.style.backgroundColor = (x+y)%2 ? "hsl(120, 60%, 45%)" : "hsl(120, 75%, 60%)";
            gameContainer.appendChild(newTile);
        }
    }
}

function setDifficulty(){
    let buttons=document.querySelectorAll('#btn-diff');
    Array.from(buttons).forEach((btn)=>{
        btn.onclick=()=>{
            switch(btn.innerHTML){
                case "Easy":
                    gridSize=8; minesNum=16;
                    gameContainer.style.gridTemplate=`repeat(${gridSize}, 32px) / repeat(${gridSize}, 32px)`;
                    break;
                case "Medium":
                    gridSize=16; minesNum=48;
                    gameContainer.style.gridTemplate=`repeat(${gridSize}, 24px) / repeat(${gridSize}, 24px)`;
                    break;
                case "Hard":
                    gridSize=24; minesNum=96;
                    gameContainer.style.gridTemplate=`repeat(${gridSize}, 16px) / repeat(${gridSize}, 16px)`;
                    break;
            }
            gameContainer.classList.remove("hidden");
            popup.diff.classList.add("hidden");
            createGrid();
            addListeners();
        }
    })
}



setDifficulty();
});