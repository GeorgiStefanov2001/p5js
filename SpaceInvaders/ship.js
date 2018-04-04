function Ship(){
  this.w = 20;
  this.h = 50;
  this.speed = 5;
  this.x = width/2;
  this.y = height-(this.h/2);
  this.damage = 15;

  this.show = function(){
    rectMode(CENTER);
    noStroke();
    fill(255,50,50);
    rect(this.x,this.y,this.w,this.h);
  }

  this.move = function(dir){
    this.x+=(this.speed*dir);
    if((this.x+this.w/2)>=width){
      this.x = width - this.w/2;
    }else if((this.x-this.w/2)<=0){
      this.x = 0 + this.w/2;
    }
  }

}
