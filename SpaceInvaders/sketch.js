function setup(){
  createCanvas(650,650);
  background(51);
}

function draw(){
  rectMode(CENTER);
  rect(width/2, height/2, 100,100);
  textAlign(CENTER);
  textSize(10);
  fill(255);
  text("That's a rectangle",width/2,height/2);
  fill(1);
}
