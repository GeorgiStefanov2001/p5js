let rectSide = 50;
let offsetX = 100; //we use this variable so we can compensate for the options on the right of the screen
let sliderSize = 70; //we use this variable so we can compensate for the slider size and align it with the text
let type = "pencil"; //we start with the pencil selected
let useSliders = true; //decides if we want to use the RGB sliders for the color of the pen (default value: true)

//Sliders

let sizeSlider;
let linesSlider;
let RSlider;
let GSlider;
let BSlider;

function setup(){
  createCanvas(750,650);
  background(51);
  DrawSliders();

}

function draw(){
  DrawButtons();
  SetText();
}

function keyPressed(){
  //The code for switching between rubber and pencil is prety simple:
  if(keyCode === TAB){
    if(type == "pencil"){
      type = "rubber";
    }else if(type == "rubber"){
      type = "pencil";
    }
  }
}

function mousePressed(){
  if(mouseClickedButton(rectSide)){
    save("Drawing.png"); // prompting the user to save the picture
  }

  if(mouseClickedButton(rectSide*2.5)){
    background(51); //if we want to clear the screen we just redraw the background
  }

  if(mouseClickedButton(rectSide*4)){
    useSliders = !useSliders //toggles the usage of RGB sliders for the colour of the pen
  }
}

function DrawButtons(){
  noStroke();
  rectMode(CENTER);
  fill(70);
  rect(width-offsetX/2,height/2,offsetX,height); //this rect is the differently colored one that is used to store the tools
  fill(255); //the buttons will be white
  rect(width-rectSide,rectSide,rectSide,rectSide); //this is the rect for the saving
  rect(width-rectSide,rectSide*2.5,rectSide,rectSide); //this is the rect for clearing
  //we multiply rectSide by 2.5 because the distance from the top of the screen to the bottom side of the first rect is exactly 1.5*rectSide
  //and since we have rectMode(CENTER) we need to add another rectSide ontop of that to make the padding look right
  rect(width-rectSide,rectSide*4,rectSide,rectSide); //this is the rect for using the RGB sliders (or not)
  //same thing about the multiplication - magical numbers ftw :DDDD
  //!CHANGE THE MAGICAL NUMBERS USED IN CALCULATING THE PLACEMENT OF THE RECTANGLES
}

function SetText(){
  fill(255,75,75);
  noStroke();
  textAlign(CENTER);
  textSize(20);

  text("Save",width-rectSide,rectSide); //text for saving
  text("Clear",width-rectSide,rectSide*2.5); //text for clearing the screen (same thing about the multiplication of rectSide by 2.5)
  text("RGB",width-rectSide,rectSide*4); //text for using the RGB sliders for pen color (same thing about the multiplication of rectSide by 4)

  text("Size",width-rectSide,height/2); //this is the text for the slider that I use for the size of the pencil
  text("Lines",width-rectSide,height/2+sliderSize); //this is the text for the slider that I use for the size of the pencil

  text("R",width-(rectSide*1.5),height/2+sliderSize*2); //this is the text for the R Slider, controlling the red in my RGB sliders
  text(floor(RSlider.value()),width - (rectSide*0.5), height/2 + sliderSize*2); //this text represents the value of the R Slider
  text("G",width-(rectSide*1.5),height/2+sliderSize*3); //this is the text for the G Slider, controlling the red in my RGB sliders
  text(floor(GSlider.value()),width - (rectSide*0.5), height/2 + sliderSize*3); //this text represents the value of the G Slider
  text("B",width-(rectSide*1.5),height/2+sliderSize*4); //this is the text for the B Slider, controlling the red in my RGB sliders
  text(floor(BSlider.value()),width - (rectSide*0.5), height/2 + sliderSize*4); //this text represents the value of the B Slider
  //SAME THING WITH THE MAGICAL NUMBERS - USED TO MAKE THE PLACEMENT BETTER
}

function DrawSliders(){
  //**Slider, controlling the size of the pencil
  sizeSlider = drawPreMadeSlider(1,10,5,0.01,1);

  //**Slider, controlling the number of linesSlider
  linesSlider = drawPreMadeSlider(1,4,1,1,2);

  //**Slider, controlling the R value of the color of the lines
  RSlider = drawPreMadeSlider(0,255,255,0.01,3);

  //**Slider, controlling the G value of the color of the lines
  GSlider = drawPreMadeSlider(0,255,255,0.01,4);

  //**Slider, controlling the B value of the color of the lines
  BSlider = drawPreMadeSlider(0,255,255,0.01,5);

}

function drawPreMadeSlider(min, max, curr, step, iter){
  //I use this pre-made function to draw a slider that is styled by my liking so the code in DrawSliders() is pretier
  //I use the variable iter to determine where the slider should be placed
  currSlider = createSlider(min,max,curr,step);
  currSlider.position(width,height/2+sliderSize*iter);
  currSlider.style('width','100px'); //this lines make the width of all the sliders to 100px

  return currSlider;
}

function mouseDragged(){
  if(type == "rubber"){
    //Code for the rubber
    stroke(51);
    line(pmouseX,pmouseY,mouseX,mouseY);
    strokeWeight(sizeSlider.value()*10);
  }else if(type == "pencil"){
    //Code for the pencil (all four of them)
    if(useSliders){
      stroke(RSlider.value(),GSlider.value(),BSlider.value()); //using the RGB values from the sliders to make the color of the pencil fully customizable
    }else{
      stroke(random(255),random(255),random(255)); //giving the pen a random color and it makes it look nice :DD
    }
    strokeWeight(sizeSlider.value()); //using the sizeSlider to adjust the weight of the stroke (how thick it is)
    line(pmouseX,pmouseY,mouseX,mouseY); //drawing a line between the previous mouse pos (last frame) and the current mouse pos (this frame)
    //below we check how many lines we have selected via the linesSlider and draw them
    if(linesSlider.value()>=2){
      line(width-pmouseX-offsetX,pmouseY,width-mouseX-offsetX,mouseY);
      if(linesSlider.value()>=3){
        line(pmouseX,height-pmouseY,mouseX,height-mouseY);
        if(linesSlider.value()==4){
          line(width-pmouseX-offsetX,height- pmouseY,width-mouseX-offsetX,height - mouseY);
        }
      }
    }
  }
}

function mouseClickedButton(posY){
  if(mouseX>=width-(offsetX-rectSide/2) && mouseX<=width-rectSide/2 && mouseY>=posY-rectSide/2 && mouseY<=posY+rectSide/2){
    //checking to see if the mouse is within the boundaries of the needed button
    //we determine which button is being click by using posY that we pass in mousePressed()
    return true;
  }else{
    return false;
  }
}
