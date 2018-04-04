let ship;
let enemies = [];
let bullets = [];
let direction = 0;
let enemy;
let game_over = false;
let won = false;

function setup(){
  createCanvas(650,650);
  background(51);
  for(let i=1;i<=7;i++){
    for(let j = 1;j<=3;j++){
      enemy = new Enemy(50*i*1.5,50*j*1.5);
      enemies.push(enemy);
    }
  }
  ship = new Ship();
}

function draw(){
  background(51);
  fill(255);
  ship.show();
  if(!game_over){
    GameController();
    EnemyMovement();
    ship.move(direction);
    ManageBullets();
    Hit();
  }else{
    GameOverScreen();
  }
}

function GameOverScreen(){
  textAlign(CENTER);
  textSize(100);
  if(won){
    text("YOU WON",width/2,height/2);
  }else{
    text("YOU LOST",width/2,height/2);
  }
  rectMode(CENTER);
  rect(width/2,height/2+100,100,50);
  fill(255);
  textAlign(CENTER);
  textSize(25);
  text("Restart",width/2,height/2+105);
}

function mousePressed(){
  if(game_over && (mouseX>=width/2-50 && mouseX<=(width/2+50) && mouseY>=height/2+85 && mouseY<=height/2+125)){
    game_over = false;
    won = false;
    setup();
  }
}

function GameController(){
  if(enemies.length<1){
    game_over = true;
    won = true;
  }

  for(let i = 0;i<enemies.length;i++){
    if(enemies[i].y>=550){
      game_over = true;
      won = false;
      enemies = [];
    }
  }

}


function Hit(){
  for(let i = bullets.length-1;i>=0;i--){
    for(let j = enemies.length-1;j>=0;j--){
      if(dist(bullets[i].x,bullets[i].y,enemies[j].x,enemies[j].y)<=(bullets[i].r+enemies[j].r)){
        enemies[j].health-=ship.damage;
        bullets.splice(i,1);
        if(enemies[j].health<=0){
          enemies.splice(j,1);
        }
        break;
      }
    }
  }
}

function ManageBullets(){
  for(let i = bullets.length-1;i>=0;i--){
    bullets[i].show();
    bullets[i].move();
    if(bullets[i].y<0){
      bullets.splice(i,1);
    }
  }
}

function keyReleased(){
  if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW){
    direction = 0;
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    direction = -1;
  }else if(keyCode === RIGHT_ARROW){
    direction = 1;
  }else if(key !== ' '){
    direction = 0;
  }

  if(key === ' '){
    bullet = new Bullet();
    bullets.push(bullet);
  }
}

function EnemyMovement(){
  for(let i =0;i<enemies.length;i++){
    enemies[i].show();
    enemies[i].move();
  }

  if(enemies.length>0){
    if(enemies[enemies.length-1].x+(enemies[enemies.length-1].r)>this.width || enemies[0].x-(enemies[0].r)<0){
      EnemyChangeDir();
    }
  }
}

function EnemyChangeDir(){
  for(let i = 0;i<enemies.length;i++){
    enemies[i].y+=enemies[i].ydir;
    enemies[i].xdir*=-1;
  }
}
