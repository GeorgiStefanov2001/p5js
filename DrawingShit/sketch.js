let w = 50;
let sizeSlider;
let linesSlider;
let RSlider;
let GSlider;
let BSlider;
let type = "pencil";
let color;

function setup(){
  drawCanvas();
  sizeSlider = createSlider(1,10,5,0.01);
  sizeSlider.position(width ,height/4+150);
  linesSlider = createSlider(1,4,1);
  linesSlider.position(width,height/4+200);

  RSlider = createSlider(0,255,255);
  RSlider.position(width,height/2+180);
  BSlider = createSlider(0,255,255);
  BSlider.position(width,height/2+240);
  GSlider = createSlider(0,255,255);
  GSlider.position(width,height/2+300);

}

function draw(){
  CanvasControl();
  textSize(25 );
  text("R",width-20,height/2+120);
  text("G",width-20,height/2+170);
  text("B",width-20,height/2+220);
  textSize(15);
  text("Size",width-40,height/4+80);
  text("Num of lines",width-90,height/4+125);
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
  createCanvas(730,650);
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
  rectMode(CENTER);
  fill(70);
  rect(width-50,height/2,100,height);
  fill(255);
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
  text("Tab - switch",width - w-w/2,15);
}

function mouseDragged(){
  if(type == "rubber"){
    stroke(51);
    line(pmouseX,pmouseY,mouseX,mouseY)
    strokeWeight(sizeSlider.value()*10);
  }else if(type == "pencil"){
    stroke(RSlider.value(),GSlider.value(),BSlider.value());
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
