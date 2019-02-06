function Pipe(){
    this.width = 30;
    this.x = width+50;
    this.speed = 3;
    this.minHeight = 30;
    this.middleSpace = 170;
    this.upperHalfHeight = random(this.minHeight,(height-(this.minHeight+this.middleSpace)));
    this.lowerHalfY = this.upperHalfHeight + this.middleSpace;

    this.show = function(){
        fill(255,0,0);
        rect(this.x,0,this.width,this.upperHalfHeight);
        rect(this.x,this.lowerHalfY,this.width,width-this.lowerHalfY);
    }

    this.move = function(){
        this.x-=this.speed;
    }
}

