let w = 50;
let sizeSlider;
let linesSlider;
let type = "pencil";

function setup(){
  drawCanvas();
  sizeSlider = createSlider(1,10,5,0.01);
  sizeSlider.position(width+80 ,height/2);
  linesSlider = createSlider(1,4,1);
  linesSlider.position(width+80,height/2+80);
}

function draw(){
  CanvasControl();
}

function keyPressed(){
  if(keyCode === TAB){
    if(type == "pencil"){
      type = "rubber";
    }else if(type == "rubber"){
      type = "pencil";
    }
  }
}

function drawCanvas(){
  createCanvas(650,650);
  background(51);
}

function mousePressed(){
  if(mouseOnButton()){
    save("Drawing.png");
  }

  if(OnClearButton()){
    drawCanvas();
  }
}

function CanvasControl(){
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(width-w,w,w,w);
  textSize(20);
  noStroke();
  fill(125);
  text("Save",width - w - w*0.45,w+w*0.10);
  noStroke();
  rectMode(CENTER);
  fill(255);
  rect(width-w,2*w+w/2,w,w);
  textSize(20);
  noStroke();
  fill(125);
  text("Clear",width - w - w*0.50,2.40*(w+w*0.10));
  textSize(10);
  noStroke();
  fill(255);
  text("Tab - switch (eraser-pencil)",width - w - w*1.6,15);
}

function mouseDragged(){
  if(type == "rubber"){
    stroke(51);
    line(pmouseX,pmouseY,mouseX,mouseY)
    strokeWeight(sizeSlider.value()*5);
  }else if(type == "pencil"){
    stroke(random(0,255),random(0,255),random(0,255));
    strokeWeight(sizeSlider.value());
    line(pmouseX,pmouseY,mouseX,mouseY);
    if(linesSlider.value()>=2){
      line(width - pmouseX,height - pmouseY,width - mouseX,height - mouseY);
      if(linesSlider.value()>=3){
        line(width - pmouseX,pmouseY,width -  mouseX,mouseY);
        if(linesSlider.value()==4){
          line(pmouseX,height- pmouseY,mouseX,height - mouseY);
        }
      }
    }
  }
}

function mouseOnButton(){
  if(mouseX>=width - (w+w/2) && mouseX<=width-w/2 && mouseY>=w/2 && mouseY<=w+w/2){
    return true;
  }else{
    return false;
  }
}

function OnClearButton(){
  if(mouseX>=width - (w+w/2) && mouseX<=width-w/2 && mouseY>=2*w && mouseY<=3*w){
    return true;
  }else{
    return false;
  }
}
