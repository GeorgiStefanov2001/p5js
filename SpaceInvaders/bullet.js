function Bullet(){
  this.r = 7;
  this.x = ship.x;
  this.y = (ship.y - ship.h/2)-this.r/2;
  this.speed = 5;
  this.color = color(100,100,255);

  this.show = function(){
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.r*2,this.r*2);
  }

  this.move = function(){
    this.y-=this.speed;
  }
}
