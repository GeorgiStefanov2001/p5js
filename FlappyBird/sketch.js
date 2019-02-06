var bird;
var pipes = [];

var spaceBetweenPipes = 200;

var score = 0;


function setup(){
    createCanvas(650,650);
    bird = new Bird(50,height/2);
    pipe = new Pipe();
    pipes.push(pipe);
}

function draw(){
    background(51);

    bird.show();
    pipes.forEach(pipe => {
        pipe.show();
    });

    if(bird.isAlive){
        bird.move();
        
        for(let i = 0;i<pipes.length;i++){
            pipes[i].move();
            pipes[i].show();
            bird.checkDeath(pipes[i]);
        }

        newPipe();
        deletePipes();

    }else{
        gameOverScreen();
    }
    drawScore();
}

function drawScore(){
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text(score,width/2,50);
}

function gameOverScreen(){
    textAlign(CENTER);
    textSize(100);
    fill(255);
    text("GAME OVER",width/2,height/2);
    textSize(25);
    fill(255)
    text("*CLICK TO RETRY*",width/2,height/2+100);
    
}

function mousePressed(){
    bird.jump();

    if(!bird.isAlive){
        restart();
    }
}

function newPipe(){
    if(pipes[pipes.length-1].x<=(width-spaceBetweenPipes)){
        var new_pipe = new Pipe();
        pipes.push(new_pipe)
    }
}

function deletePipes(){
    for(let i = 0;i<pipes.length;i++){
        if(pipes[i].x<-pipes[i].width){
            pipes.splice(i,1);
            score++;
        }
    }
}

function restart(){
    background(51);
    bird.isAlive = true;
    bird.x = 50;
    bird.y = height/2;
    pipes = [];
    pipe = new Pipe();
    pipes.push(pipe);
    score = 0;
}

