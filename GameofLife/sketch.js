let side = 10; //the side of one rect / cell
let cols; //number of columns
let rows; //number of rows

let current = []; //the grid we use for the cells
let next = []; //for the next generation

function setup(){
  createCanvas(800,800);
  cols = width/side;
  rows = height/side;
  background(51);
  createMatrix();
  frameRate(20);
}

function draw(){
  drawGrid(side);
  generate();
}

function createMatrix(){
  //making the simple arrays into two-dimensional arrays
  for(let i = 0;i<cols;i++){
    current[i] = [];
    next[i] = [];
  }

  //randomly decide if the cell is dead or alive (the chance of it being alive is much lower because if it's 50:50 it gets cluttered)
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      let deadOrAlive = floor(random(10));
      current[i][j] = deadOrAlive == 1 ? deadOrAlive : 0;
      next[i][j] = 0; //initialize the array for the next generation (tick) - in the beggining it should be empty
    }
  }
}

function drawGrid(){
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      let fillColor = current[i][j] == 1 ? 0 : 255; //black if the cell is alive, white if it's dead
      fill(fillColor);
      noStroke();
      rect(side*i,side*j,side,side); //making a 'cell' - a simple rect with a size of 'side'
    }
  }
}

function countNeighbours(i,j){
  let aliveNeighbours = 0;

  if(i == 0 || i == rows-1 || j == 0 || j == cols - 1){
    //its placed on the border
    //it should not be randomly decided how many alive neighbours the cell has
    //but for now (until i find a better solution that is clean) it will work
    aliveNeighbours = floor(random(8));
  }else{
    //checking all the neighbours - kinda messy but whatever :D
    aliveNeighbours+=checkDeadOrAlive(i-1,j-1);
    aliveNeighbours+=checkDeadOrAlive(i-1,j);
    aliveNeighbours+=checkDeadOrAlive(i-1,j+1);
    aliveNeighbours+=checkDeadOrAlive(i,j-1);
    aliveNeighbours+=checkDeadOrAlive(i,j+1);
    aliveNeighbours+=checkDeadOrAlive(i+1,j-1);
    aliveNeighbours+=checkDeadOrAlive(i+1,j);
    aliveNeighbours+=checkDeadOrAlive(i+1,j+1);
  }

  return aliveNeighbours;
}

function generate(){
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      let neighbours = countNeighbours(i,j); //geting all alive neighbours
      if(current[i][j] == 1){
        if(neighbours<2){
          next[i][j] = 0; //the cell dies by underpopulation
        }
        else if(neighbours == 2 || neighbours == 3){
          next[i][j] = 1; //the cell lives
        }else if(neighbours>3){
          next[i][j] = 0; //the cell dies by overpopulation
        }
      }else {
        if(neighbours == 3){
          next[i][j] = 1; //the dead cell becomes a living one by reproduction
        }
      }
    }
  }

  //swaping the arrays;
  current = next;
}

//this function is used to check if a cell is dead or alive
function checkDeadOrAlive(i,j){
  return current[i][j];
}
