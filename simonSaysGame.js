let gameSeq = [];
let userSeq = [];

let box = document.querySelector(".box");
let start = document.querySelector(".start");
let h3 = document.querySelector("h3")
let btns = ["b1","b2","b3","b4"];
let quitGame = document.querySelector(".quit");
let bg = document.querySelector(".bg");
let score = document.querySelector("h2");
let highestScore = 0;


let started = false;
let level = 0;


start.addEventListener("click",function (){
    if(started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
});

function btnBlink(btn){
    btn.classList.add("blink");
    setTimeout(function(){
        btn.classList.remove("blink");
    }, 200);
};

function userClick(btn){
    btn.classList.add("userClick");
    setTimeout(function(){
        btn.classList.remove("userClick");
    }, 200  );
};

function levelUp(){
    
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnBlink(randBtn);
};

function checkAns(){
    console.log("current level :" , level);
    let idx = userSeq.length - 1;

    if(gameSeq[idx]==userSeq[idx]){
        if(gameSeq.length==userSeq.length){
            setTimeout(levelUp,600)   
            bg.style.background = "linear-gradient(to bottom,white,green,white)";
            setTimeout(() =>{
            bg.style.background = "linear-gradient(to bottom,white,grey,white)"
        },500)
        }
    }else{
        h3.innerHTML = `GAME OVER! Press 'start' to restart the game.`;
        h3.style.color = "red"
        setTimeout(()=>{
            h3.style.color = "blue"
        },2000)
        bg.style.background = "linear-gradient(to bottom,white,red,white)";
        setTimeout(() =>{
            bg.style.background = "linear-gradient(to bottom,white,grey,white)"
        },500)

        if(level > highestScore){
            score.innerText = `YOUR SCORE : ${level}`;
        }

        started = false;
        gameSeq = [];
        level = 0;
        
    }
}

function btnPress(){
    let btn = this;
    userClick(btn)
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns();
};


let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn){
    btn.addEventListener("click",btnPress);
};


function quit(){
    h3.innerHTML = `GAME QUIT! Press 'start' to restart the game.`;
    started = false;
    gameSeq = [];

    if(level > highestScore){
            score.innerText = `YOUR SCORE : ${level}`;
        }
    
    level = 0;
}

quitGame.addEventListener("click",quit);

