function Bird(x,y){
    this.x = x;
    this.y = y;
    this.r = 25;
    this.uplift = -20;
    this.gravity = 0.7; 
    this.vel = 0;
    this.isAlive = true;

    this.show = function(){
        noStroke();
        fill(255);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }

    this.move = function(){
        this.vel+=this.gravity;
        this.vel*=0.9;
        this.y+=this.vel;
        this.checkUpperBorder();

    }

    this.jump = function(){
        this.vel+=this.uplift;
    }

    this.checkUpperBorder = function(){
        if(this.y-this.r<=0){
            this.y = this.r;
        }
    }

    this.checkDeath = function(pipe){
        if(this.y+this.r>=width){
            this.isAlive = false;
        }
        
        if(this.x+this.r>=pipe.x && this.x-this.r<=(pipe.x+pipe.width)){
            if(!(this.y - this.r>=(pipe.upperHalfHeight) && this.y+this.r<=pipe.upperHalfHeight + pipe.middleSpace)){
                this.isAlive = false;
            }
        }
    }
}