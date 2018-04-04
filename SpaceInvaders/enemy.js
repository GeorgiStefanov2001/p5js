function Enemy(x,y){
  this.x = x;
  this.y = y;
  this.r = 25;
  this.xdir = 1;
  this.ydir = 15;
  this.speed = 1.5;
  this.health=45;
  this.color = color(random(0,255),random(0,255),random(0,255));

  this.show = function(){
    noStroke();
    fill(255);
    ellipse(this.x,this.y,this.r*2,this.r*2);
  }

  this.move = function(){
    this.x+=(this.speed*this.xdir);
  }
}
