let welcomeScreen=document.querySelectorAll(".skewed");
let frames=document.querySelectorAll(".frame");
function dismissWS(){
    welcomeScreen.forEach(function(ws){
            ws.style.opacity="0";
        })
    setTimeout(function (){
        welcomeScreen.forEach(function(ws){
            ws.style.display="none";
        })
        frames.forEach(function(f){
            f.style.display="flex";
        })
    },500)
}

document.addEventListener("keydown",function(event){
    if(event.key=="Enter"){
        dismissWS();
    }
})

setTimeout(function (){
    dismissWS();
},5000)

let bChar = document.querySelector("blink-char");
setInterval(function (){
    bChar.innerHTML=" ";
    setTimeout(function(){
        bChar.innerHTML="▁";
    },750)
},1500)