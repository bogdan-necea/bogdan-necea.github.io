// project variables
const canvas= document.querySelector("canvas");
const c=canvas.getContext("2d");

const input={
    µ: document.getElementById("µ"),
    m: document.getElementById("m"),
    F: document.getElementById("F")
}

const btnSubmit=document.getElementById("submit");
let btnToggle={
    self: document.getElementById("toggle"),
    state: true
}
const display=document.getElementById("display");

// physics variables
const g=9.81; let m=2, μ=0.1, v=0 ,v1=0; 

let G=m*g, N=m*g;

let F=10, Ff=(μ*N);

let a=(F-Ff)/m;

function element(){
    this.drawGround=function(){
        c.strokeStyle="#000000";
        c.lineWidth=2;
        c.beginPath();
        for(let i=0;i<canvas.width+20;i+=20){
            c.moveTo(i,460);
            c.lineTo(i+20,460);
            c.lineTo(i-20,480);
            c.stroke();
        }
        c.closePath();
    }
    this.drawObject=function(x,y,w,h){
        c.strokeStyle="#00ff00";
        c.lineWidth=2;
        c.strokeRect(x,y,w,h);
    }
    this.drawF=function(){
        c.strokeStyle="#0000ff";
        c.beginPath();
        c.moveTo(x+objectSize,435);
        c.lineTo(x+objectSize+F*5,435);
        c.lineTo(x+objectSize+F*5-5,430);
        c.moveTo(x+objectSize+F*5,435);
        c.lineTo(x+objectSize+F*5-5,440);
        c.stroke();
    }
    this.drawFf=function(){
        c.strokeStyle="#00ffff";
        c.beginPath();
        c.moveTo(x,460);
        c.lineTo(x+Ff*-5,460);
        c.lineTo(x+Ff*-5+5,455);
        c.moveTo(x+Ff*-5,460);
        c.lineTo(x+Ff*-5+5,465);
        c.stroke();
    }
    this.drawG=function(){
        c.strokeStyle="#ff0000";
        c.beginPath();
        c.moveTo(x+objectSize/2+2,435);
        c.lineTo(x+objectSize/2+2,435+G*2);
        c.lineTo(x+objectSize/2+5+2,435+G*2-5);
        c.moveTo(x+objectSize/2+2,435+G*2);
        c.lineTo(x+objectSize/2-5+2,435+G*2-5);
        c.stroke();
    }
    this.drawN=function(){
        c.strokeStyle="#ff00ff";
        c.beginPath();
        c.moveTo(x+objectSize/2-2,410 + objectSize);
        c.lineTo(x+objectSize/2-2,410 + objectSize - N * 2);
        c.lineTo(x+objectSize/2-2+5,410 + objectSize - N * 2+5);
        c.moveTo(x+objectSize/2-2,410 + objectSize - N * 2);
        c.lineTo(x+objectSize/2-5-2,410 + objectSize - N * 2+5);
        c.stroke();
    }
}

let t=0,t1=0;
let objectSize=50;
let x=0,x1=0;
btnToggle.self.addEventListener("click",()=>{
        btnToggle.state=!btnToggle.state;
})
function animate(){
    c.clearRect(0,0,canvas.width,canvas.height);
    x=0.5 * a * (t/60) * (t/60);
    //draw objects
    let ground=new element();
    ground.drawGround();

    let object= new element();
    object.drawObject(x,410,objectSize,objectSize);
    
    if(btnToggle.state){
        let FArrow= new element();
        FArrow.drawF();

        let FfArrow= new element();
        FfArrow.drawFf();

        let  GArrow= new element();
        GArrow.drawG();

        let NArrow= new element();
        NArrow.drawN();
    }
    v=a*t; t+=1;

    display.innerHTML=
    `
            a = (F-Ff)/m = (${F.toFixed(2)}N - ${Ff.toFixed(2)}N)/${m.toFixed(2)}kg = ${a.toFixed(2)}m/s²
        <br>t = ${(t/60).toFixed(1)}s | t₁ = ${(t1/60).toFixed(1)}s
        <br>v = a•t = ${(a*(t/60).toFixed(2)).toFixed(2)} m/s | v₁ = ${v1.toFixed(2)} m/s
        <br><magenta>N</magenta> = <red>G</red> = m•g = ${m.toFixed(2)}kg • ${g.toFixed(2)}m/s² = ${N.toFixed(2)}N
        <br><blue>F</blue> = ${F.toFixed(2)}N | <cyan>Ff</cyan> = μ • N = ${Ff.toFixed(2)}N
        <br>x₀ = 0m | x = ${x.toFixed(2)}m | x₁ = 720m 
    `;
    if(x>canvas.width || Ff>=F){
        v1=a*(t/60).toFixed(2);
        v=0;
        t1=t;
        t=0;
    }

}
setInterval(animate,1000/60);

btnSubmit.addEventListener("click",function(){
    if(input.m.value!="" && input.F!="" && input.µ.value!=""){
        m=Math.abs(Number(input.m.value));
        F=Math.abs(Number(input.F.value));
        console.log(F);
        μ=Math.abs(Number(input.µ.value));
        G=m*g;
        N=m*g;
        Ff=(μ*N);
        a=(F-Ff)/m
        v1=0; t1=0;
        v=0; t=0;
    }
});